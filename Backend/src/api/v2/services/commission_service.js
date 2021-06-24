const {Commission, Department, sequelize} = require('../models');
const {Op} = require('sequelize');

const TRASLAPED_DATES_ERROR =
  'Dates for the commission are in traslaped with another';
const INVALID_DATES_ERROR = 'Dates for the commission are invalid';

exports.findCommissionsByEmployee = async (employee, pagination) => {
  return Commission.findAll({
    include: [
      {
        attributes: [],
        association: 'employee',
        where: {
          id: employee.id,
        },
      },
    ],
    limit: pagination.limit,
    offset: pagination.offset,
  });
};

exports.findCommissionsByManager = async (manager) => {
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

exports.findCommissionsByDepartment = async (departmentName) => {
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

exports.findCommissionById = async (id) => {
  return Commission.findOne({
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
};

exports.findCommissionByIdAndEmployee = async (id, employee) => {
  return Commission.findOne({
    include: [
      {
        association: 'employee',
        include: ['profile', 'department'],
        where: {
          id: employee.id,
        },
      },
    ],
    where: {
      id: id,
    },
  });
};

exports.findCommissionByIdAndManager = async (id, manager) => {
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

exports.createCommission = async (comissionData, employeeOwner) => {
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
          id: employeeOwner.id,
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
  await commissionCreated.addEmployee(employeeOwner);
  return commissionCreated;
};

exports.updateCommissionByManager = async (
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

exports.updateCommissionByFinances = async (idCommission, isApproved) => {
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

exports.depositToCommission = async (idCommission, amount) => {
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