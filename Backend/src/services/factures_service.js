const {Facture} = require('../models');
const {CommissionService} = require('../services');
const {Op} = require('sequelize');

exports.createFacture = async (facture) => {
  return Facture.create(facture);
};

exports.findFacturesByCommission = async (commissionId) => {
  return Facture.findAll({
    where: {
      commissionId: commissionId,
    },
  });
};

exports.findFacturesByEmployee = async (employee) => {
  const commissions = await CommissionService.findCommissionsByEmployee(
      employee,
  );

  const idCommissions = commissions.map((commission) => commission.id);

  return Facture.findAll({
    include: [
      {
        attributes: [],
        association: 'commission',
        where: {
          id: {[Op.in]: idCommissions},
        },
      },
    ],
  });
};

exports.findFacturesByIdAndEmployee = async (factureId, employee) => {
  return Facture.findOne({
    where: {
      id: factureId,
    },
  });
};


