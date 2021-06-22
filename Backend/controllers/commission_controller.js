const CommissionService = require('../services/commission_service.js');
const EmployeeService = require('../services/employee_service.js');

exports.findCommissionsByEmployee = async (req, res) => {
  try {
    const commissions = await CommissionService.findCommissionsByEmployee(
        req.employee,
    );
    res.status(200).json(commissions);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.findCommissionsByEmployeeId = async (req, res) => {
  const id = req.params.id;
  try {
    const employee = await EmployeeService.findEmployeeById(id);
    if (!employee) {
      throw new Error();
    }
    const commissions = await CommissionService.findCommissionsByEmployee(
        employee,
    );
    res.status(200).json(commissions);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.findCommissionByIdAndEmployee = async (req, res) => {
  const id = req.params.id;
  try {
    const commissions = await CommissionService.findCommissionByIdAndEmployee(
        id,
        req.employee,
    );
    res.status(200).json(commissions);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.findCommissionsByManager = async (req, res) => {
  try {
    const commissions = await CommissionService.findCommissionsByManager(
        req.employee,
    );
    res.status(200).json(commissions);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.findCommissionsByDepartment = async (req, res) => {
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

exports.findCommissionByIdAndManager = async (req, res) => {
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

exports.findCommissionById = async (req, res) => {
  const id = req.params.id;
  try {
    const commission = await CommissionService.findCommissionById(id);
    if (!commission) {
      return res.status(404).send();
    }
    res.status(200).json(commission);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.createCommission = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = [
    'typeCommission',
    'beginDate',
    'endDate',
    'placeCommission',
  ];
  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }
  try {
    const commission = await CommissionService.createCommission(
        req.body,
        req.employee,
    );
    res.status(200).json(commission);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.updateCommissionByManager = async (req, res) => {
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

exports.updateCommissionByFinances = async (req, res) => {
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


exports.depositToCommision = async (req, res) => {
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
