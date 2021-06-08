const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/auth_router.js');
const employeeRouter = require('./routers/employee_router.js');
const commissionRouter = require('./routers/commission_router.js');
const departmentRouter = require('./routers/department_router.js');
const factureRouter = require('./routers/facture_router.js');

const port = process.env.PORT;
const app = express();

app.disable('x-powered-by');

app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://sistema-viaticos.uc.r.appspot.com',
  ],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'X-Requested-With,Content-Type, Access-Control-Allow-Origin',
  credentials: true,
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(authRouter);
app.use(employeeRouter);
app.use(commissionRouter);
app.use(departmentRouter);
app.use(factureRouter);

app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
