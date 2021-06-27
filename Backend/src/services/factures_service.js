const {Facture} = require('../models');
const {CommissionService} = require('../services');
const {Op} = require('sequelize');

/**
 * Fetch factures by commission and employe from DB.
 *
 * This method retrieves factures by commission from the database based on
 * the commission. If the employee is not the owner of the commissions
 * then this methods will throw a exception.
 *
 * @param  {number} commissionId The commission id which is a integer number.
 * @param  {Employee} employee The employee owner.
 * @param  {Pagination} pagination The pagination object
 * @param  {Pagination.limit} limit The number of commissions to fetch.
 * @param  {Pagination.offset} offset The initial element to fetch commisions.
 * @return {Factures} The commission factures
 *
 */
exports.findFacturesByCommissionAndEmployee = async (
    commissionId,
    employee,
    pagination,
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
    limit: pagination.limit,
    offset: pagination.offset,
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
