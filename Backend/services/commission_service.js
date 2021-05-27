const {Commission} = require('../models/index.js');
const {Op} = require('sequelize');

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
  const isValid = await Commission.findAll({
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
      [Op.or]: [{
        beginDate: {
          [Op.between]: [comissionData.beginDate, comissionData.endDate],
        },
      }, {
        endDate: {
          [Op.between]: [comissionData.beginDate, comissionData.endDate],
        },
      },
      ],
    },
  });
  const today = new Date();
  const beginDate = new Date(comissionData.beginDate);
  const endDate = new Date(comissionData.endDate);
  if (isValid.length > 0 ||
     beginDate <= today ||
     endDate <= today ||
     endDate < beginDate) {
    throw new Error('Fechas de comisión invalidas');
  }
  const commissionCreated = await Commission.create(comissionData);
  await commissionCreated.addEmployee(employee);
  return commissionCreated;
};