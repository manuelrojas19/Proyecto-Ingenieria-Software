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
  const comisssions = await Commission.findAll();
  comisssions.forEach((comission) => {
    console.log(comission.beginDate, comission.endDate);
  });
  const commissionCreated = await Commission.create(comissionData);
  await commissionCreated.addEmployee(employee);
  return commissionCreated;
};
