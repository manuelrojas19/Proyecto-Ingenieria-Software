const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const {logger, expressLogger} = require('./util/logger.js');
const corsConfig = require('./config/cors_config.js');
const RouterV2 = require('./routers');
const specs = require('./util/swagger.js');
const {handleError, logError} = require('./middleware/error.js');

const PORT = process.env.PORT;
const BASE_PATH_V2 = '/api/v2';
const PATH_DOC = '/api/doc';

const app = express();

app.use(expressLogger);
app.use(helmet());
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Routes v2
app.use(BASE_PATH_V2, RouterV2.AuthRouter);
app.use(BASE_PATH_V2, RouterV2.CommissionRouter);
app.use(BASE_PATH_V2, RouterV2.FactureRouter);

// Documentation
app.use(PATH_DOC, swaggerUi.serve, swaggerUi.setup(specs, {explore: true}));

app.use(logError);
app.use(handleError);

app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT}`);
});
