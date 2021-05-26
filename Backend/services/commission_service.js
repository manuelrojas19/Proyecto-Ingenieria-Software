const {Commission} = require('../models/index.js');

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
    where: {
      beginDate: {
        [Op.between]: [comissionData.beginDate, comissionData.endDate],
      },
      endDate: {
        [Op.between]: [comissionData.beginDate, comissionData.endDate],
      },
    },
  });
  if (isValid.length > 0) {
    throw new Error('Fechas interlapadas');
  }
  const commissionCreated = await Commission.create(comissionData);
  await commissionCreated.addEmployee(employee);
  return commissionCreated;
};
