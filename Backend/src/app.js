const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routerV1 = require('./v1/routers/index.js');
const corsConfig = require('./v1/config/cors_config.js');

const port = process.env.PORT;

const app = express();

app.disable('x-powered-by');
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/v1', routerV1.AuthRouter);
app.use('/api/v1', routerV1.CommissionRouter);
app.use('/api/v1', routerV1.DepartmentRouter);
app.use('/api/v1', routerV1.EmployeeRouter);
app.use('/api/v1', routerV1.FactureRouter);

app.listen(port, () => {
  console.log('App is listening on port ' + port);
});
