const {Facture} = require('../models/index.js');
const CommissionService = require('../services/commission_service.js');

exports.findFacturesByCommissionAndEmployee = async (
    commissionId,
    employee,
) => {
  const commission = await CommissionService.findCommissionByIdAndEmployee(
      commissionId,
      employee,
  );
  if (!commission) {
    throw new Error('Commission does not exists');
  }
  return Facture.findAll({
    where: {
      commissionId: commissionId,
    },
    include: ['commission'],
  });
};

exports.findFacturesByCommission = async (commissionId) => {
  const commission = await CommissionService.findCommissionById(commissionId);
  if (!commission) {
    throw new Error('Commission does not exists');
  }
  return Facture.findAll({
    where: {
      commissionId: commissionId,
    },
    include: ['commission'],
  });
};

exports.findFacturesByIdAndEmployee = async (factureId, employee) => {
  return Facture.findOne({
    where: {
      id: factureId,
    },
  });
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
