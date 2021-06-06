const {Facture} = require('../models/index.js');
const CommissionService = require('../services/commission_service.js');

exports.findAllFactures = async () => {
  return Facture.findAll();
};

exports.createFacture = async (facture, employee) => {
  const commission = await CommissionService.findCommissionByIdAndEmployee(
      facture.commissionId,
      employee,
  );
  if (!commission) {
    throw new Error('Commission does not exists');
  }
  return Facture.create(facture);
};
