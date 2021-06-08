const multer = require('multer');
const fs = require('fs');

const DIR = '../../Comprobantes';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const department = req.employee.department.departmentDescription;
    const employee =
      req.employee.lastName.split(' ').join('') +
      req.employee.name.split(' ').join('');
    const employeeId = req.employee.id;
    const date = new Date().toISOString().toLowerCase().split(' ').join('-');
    const path = `${DIR}/${department}/${employee}-${employeeId}/${date}`;
    fs.mkdirSync(path, {recursive: true});
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName);
  },
});

module.exports = storage;
