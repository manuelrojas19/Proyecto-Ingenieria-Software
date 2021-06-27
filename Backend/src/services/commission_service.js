const {Commission, Department, sequelize} = require('../models');
const {Op} = require('sequelize');
const NotFoundError = require('../errors/not_found_error.js');

const TRASLAPED_DATES_ERROR =
  'Dates for the commission are in traslaped with dates in another commission';
const INVALID_DATES_ERROR = 'Dates for the commission are invalid';

const commissionService = {};

/**
 * Fetch commissions by employe from DB.
 *
 * This method retrieves employee commissions from the database based on
 * the employee's ID
 *
 * @param  {number} employeeId The id of employee owner of the commissions.
 * @param  {Pagination} pagination The pagination object.
 * @return {Commissions} The employee commissions
 *
 */
commissionService.findCommissionsByEmployee = async (
    employeeId,
    pagination,
) => {
  return Commission.findAll({
    include: [
      {
        attributes: [],
        association: 'employee',
        where: {
          id: employeeId,
        },
      },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
  });
};

commissionService.findCommissionByIdAndEmployee = async (
    commissionId,
    employeeId,
) => {
  const commission = await Commission.findOne({
    include: [
      {
        attributes: [],
        association: 'employee',
        where: {
          id: employeeId,
        },
      },
    ],
    where: {
      id: commissionId,
    },
  });
  if (!commission) {
    throw new NotFoundError(
        `Commission with id ${commissionId} was not found.`,
    );
  }
  return commission;
};

commissionService.findCommissionsByManager = async (manager) => {
  return Commission.findAll({
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
        where: {
          departmentId: manager.department.id,
        },
      },
    ],
  });
};

commissionService.findCommissionsByDepartment = async (departmentName) => {
  const departmentExist = await Department.findOne({
    where: {
      departmentDescription: departmentName,
    },
  });
  if (!departmentExist) {
    throw new Exception('Department does not exists');
  }
  return Commission.findAll({
    where: {
      isApprovedByManager: true,
    },
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
        where: {
          departmentId: departmentExist.id,
        },
      },
    ],
  });
};

commissionService.findCommissionById = async (id) => {
  const commission = await Commission.findOne({
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
      },
    ],
    where: {
      id: id,
    },
  });
  if (!commission) {
    throw new NotFoundError(`Commission with id ${id} was not found.`);
  }
  return commission;
};

commissionService.findCommissionByIdAndManager = async (id, manager) => {
  return Commission.findOne({
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
        where: {
          departmentId: manager.department.id,
        },
      },
    ],
    where: {
      id: id,
    },
  });
};

/**
 * Store a commission in the DB.
 *
 * This method stores a commission into the DB
 *
 * @param  {Commission} comissionData The commission data to store in the DB.
 * @param  {Employee} employe The employee owner of the commission to store.
 * @return {Commission} The commission stored in the DB
 *
 * @throws Will throw an error if the endDate is before the beginDate or if the
 *         if the beginDate or endDate are less than today.
 *         Also if the dates are traslaped with the dates of another commission.
 */
commissionService.createCommission = async (comissionData, employe) => {
  const today = new Date();
  const beginDate = new Date(comissionData.beginDate);
  const endDate = new Date(comissionData.endDate);

  if (beginDate <= today || endDate <= today || endDate < beginDate) {
    throw new Error(INVALID_DATES_ERROR);
  }

  const traslapedCommissionExist = await Commission.findOne({
    include: [
      {
        attributes: [],
        association: 'employee',
        where: {
          id: employe.id,
        },
      },
    ],
    where: {
      [Op.or]: [
        {
          beginDate: {
            [Op.between]: [comissionData.beginDate, comissionData.endDate],
          },
        },
        {
          endDate: {
            [Op.between]: [comissionData.beginDate, comissionData.endDate],
          },
        },
      ],
    },
  });

  if (traslapedCommissionExist) {
    throw new Error(TRASLAPED_DATES_ERROR);
  }

  const commissionCreated = await Commission.create(comissionData);
  await commissionCreated.addEmployee(employe);
  return commissionCreated;
};

commissionService.updateCommissionByManager = async (
    idCommission,
    manager,
    isApproved,
) => {
  const commission = await Commission.findOne({
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
        where: {
          departmentId: manager.department.id,
        },
      },
    ],
    where: {
      id: idCommission,
    },
  });
  if (!commission) {
    throw new Error('Commission does not exist');
  }
  commission.isApprovedByManager = isApproved;
  await commission.save();
  return commission;
};

commissionService.updateCommissionByFinances = async (
    idCommission,
    isApproved,
) => {
  const commission = await Commission.findOne({
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
      },
    ],
    where: {
      id: idCommission,
    },
  });
  if (!commission) {
    throw new Error('Commission does not exist');
  }
  commission.isApprovedByFinances = isApproved;
  await commission.save();
  return commission;
};

commissionService.depositToCommission = async (idCommission, amount) => {
  return sequelize.transaction(async (t) => {
    const commission = await Commission.findOne({
      include: [
        {
          association: 'employee',
          include: ['profile', 'department'],
        },
      ],
      where: {
        id: idCommission,
      },
      transaction: t,
    });
    if (!commission) {
      throw new Error('Commission does not exist');
    }

    const departmentName =
      commission.employee[0].department.departmentDescription;

    const department = await Department.findOne({
      where: {
        departmentDescription: departmentName,
      },
      transaction: t,
    });
    if (!department) {
      throw new Error('Department does not exists');
    }

    if (commission.typeCommission === 'Transporte') {
      if (department.budgetTransport - amount < 0) {
        throw new Error('Budget not enough');
      }
      department.budgetTransport = department.budgetTransport - amount;
    }

    if (commission.typeCommission === 'Viaticos') {
      if (department.budgetViatic - amount < 0) {
        throw new Error('Budget not enough');
      }
      department.budgetViatic = department.budgetViatic - amount;
    }

    commission.amountAssigned = amount;
    await department.save({transaction: t});
    return await commission.save({transaction: t});
  });
};

module.exports = commissionService;
