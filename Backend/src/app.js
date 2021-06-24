const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const {logger, expressLogger} = require('./v2/util/logger.js');

const RouterV1 = require('./v1/routers/index.js');
const corsConfig = require('./v1/config/cors_config.js');

const PORT = process.env.PORT;
const ROOT_PATH_VERSION_1 = '/api/v1';

const app = express();

app.use(expressLogger);
app.disable('x-powered-by');
app.use(cookieParser());
app.use(cors(corsConfig));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(ROOT_PATH_VERSION_1, RouterV1.AuthRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.CommissionRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.DepartmentRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.EmployeeRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.FactureRouter);

app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT}`);
});
