const {Commission} = require('../models/index.js');
const {Op} = require('sequelize');

const TRASLAPED_DATES_ERROR =
  'Dates for the commission are in traslaped with another';
const INVALID_DATES_ERROR = 'Dates for the commission are invalid';

exports.findCommissionsByEmployee = async (employee) => {
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
  });
};

exports.createCommission = async (comissionData, employee) => {
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
          id: employee.id,
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
  await commissionCreated.addEmployee(employee);
  return commissionCreated;
};
