const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routers/auth_router.js');
const employeeRouters = require('./routers/employee_router.js');

const port = process.env.PORT;
const app = express();

app.disable('x-powered-by');

app.use(cookieParser());

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://sistema-viaticos.uc.r.appspot.com/'
  ],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'X-Requested-With,Content-Type',
  credentials: true,
}));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(authRouter);
app.use(employeeRouters);

app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
