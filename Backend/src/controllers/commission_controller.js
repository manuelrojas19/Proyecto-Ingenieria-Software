const {CommissionService, EmployeeService} = require('../services/index.js');
const {logger} = require('../util/logger.js');

const commissionController = {};

commissionController.employeeFindCommissions = async (req, res) => {
  const pagination = {};
  pagination.limit = parseInt(req.query.limit ? req.query.limit : 10);
  pagination.offset = parseInt(req.query.offset ? req.query.offset : 0);

  try {
    logger.info('Fetching comissions from DB');
    const commissions = await CommissionService.findCommissionsByEmployee(
        req.employee.id,
        pagination,
    );
    logger.info(
        commissions,
        'Commissions was found succesfully, sending to client',
    );
    res.status(200).json({commissions: commissions});
  } catch (e) {
    next(e);
  }
};

commissionController.employeeFindCommissionById = async (req, res, next) => {
  const commissionId = req.params.id;
  try {
    logger.info(`Fetching comission with id: ${commissionId} from DB`);
    const commission = await CommissionService.findCommissionByIdAndEmployee(
        commissionId,
        req.employee.id,
    );
    logger.info(
        commission.toJSON(),
        'Commission was found succesfully, sending to client',
    );
    res.status(200).json({commission: commission});
  } catch (e) {
    next(e);
  }
};

commissionController.employeeCreateCommission = async (req, res, next) => {
  const params = Object.keys(req.body);
  const allowParams = [
    'typeCommission',
    'beginDate',
    'endDate',
    'placeCommission',
  ];
  logger.info(req.body, 'Commission request body from client');
  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }

  const commissionData = req.body;

  try {
    logger.info('Storing commission in the database');
    const commission = await CommissionService.createCommission(
        commissionData,
        req.employee,
    );
    logger.info(commission, 'Commission stored succesfully, sending to client');
    res.status(201).json({commission: commission});
  } catch (e) {
    next(e);
  }
};

commissionController.findCommissionsByEmployeeId = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeService.findEmployeeById(id);
    const commission = await CommissionService.findCommissionsByEmployee(
        employee,
    );
    res.status(200).json({commission: commission});
  } catch (e) {
    next(e);
  }
};

commissionController.findCommissionsByManager = async (req, res) => {
  try {
    const commissions = await CommissionService.findCommissionsByManager(
        req.employee,
    );
    res.status(200).json(commissions);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

commissionController.findCommissionsByDepartment = async (req, res) => {
  const deparment = req.params.department;
  try {
    const commissions = await CommissionService.findCommissionsByDepartment(
        deparment,
    );
    res.status(200).json(commissions);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

commissionController.findCommissionByIdAndManager = async (req, res) => {
  const id = req.params.id;
  try {
    const commission = await CommissionService.findCommissionByIdAndManager(
        id,
        req.employee,
    );
    if (!commission) {
      return res.status(404).send();
    }
    res.status(200).json(commission);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

commissionController.findCommissionById = async (req, res) => {
  const id = req.params.id;
  try {
    const commission = await CommissionService.findCommissionById(id);
    if (!commission) {
      return res.status(404).send();
    }
    res.status(200).json({commission: commission});
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

commissionController.updateCommissionByManager = async (req, res) => {
  try {
    const commission = await CommissionService.updateCommissionByManager(
        req.params.id,
        req.employee,
        req.body.isApprovedByManager,
    );
    res.status(200).json(commission);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

commissionController.updateCommissionByFinances = async (req, res) => {
  try {
    const commission = await CommissionService.updateCommissionByFinances(
        req.params.id,
        req.body.isApprovedByFinances,
    );
    res.status(200).json(commission);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

commissionController.depositToCommision = async (req, res) => {
  try {
    const commission = await CommissionService.depositToCommission(
        req.params.id,
        req.body.amount,
    );
    res.status(200).json(commission);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = commissionController;
