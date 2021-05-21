const {Commission} = require('../models/index.js');

exports.createCommission = async (comission, employee) => {
  const commissionCreated = await Commission.create(comission);
  await commissionCreated.addEmployee(employee);
  return commissionCreated;
};
