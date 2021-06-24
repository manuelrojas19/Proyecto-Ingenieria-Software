const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const {logger, expressLogger} = require('./util/logger.js');
const corsConfig = require('./config/cors_config.js');

const RouterV1 = require('./api/v1/routers');
const RouterV2 = require('./api/v2/routers');

const PORT = process.env.PORT;
const ROOT_PATH_VERSION_1 = '/api/v1';
const ROOT_PATH_VERSION_2 = '/api/v2';

const app = express();

app.use(expressLogger);
app.use(helmet());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(ROOT_PATH_VERSION_1, RouterV1.AuthRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.CommissionRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.DepartmentRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.EmployeeRouter);
app.use(ROOT_PATH_VERSION_1, RouterV1.FactureRouter);

app.use(ROOT_PATH_VERSION_2, RouterV2.AuthRouter);
app.use(ROOT_PATH_VERSION_2, RouterV2.CommissionRouter);
app.use(ROOT_PATH_VERSION_2, RouterV2.FactureRouter);

app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT}`);
});
