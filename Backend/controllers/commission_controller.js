const CommissionService = require('../services/commission_service.js');

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
