const {
  FactureService,
  EmployeeService,
  CommissionService,
} = require('../services/index.js');
const {logger} = require('../util/logger.js');
const storage = require('../util/storage.js');

const factureController = {};

factureController.employeeFindFacturesByCommission = async (req, res, next) => {
  const queryOptions = {};

  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 6;
  const page =
    parseInt(req.query.page) && parseInt(req.query.page) > 0 ?
      parseInt(req.query.page) :
      1;
  queryOptions.limit = limit;
  queryOptions.offset = (page - 1) * limit;

  const commisionId = req.params.commission;
  try {
    logger.info(
        `Fetching factures of commission with id ${commisionId} from DB`,
    );
    const commission = await CommissionService.findCommissionByIdAndEmployee(
        commisionId,
        req.employee.id,
    );

    const factures = await FactureService.findFacturesByCommission(
        commission.id,
        queryOptions,
    );

    const pagination = {};
    pagination.total = factures.count;
    pagination.pages = Math.ceil(factures.count / limit);
    pagination.page = page;
    pagination.limit = limit;

    logger.info(factures, 'Factures founded succesfully, sending to client');
    res.status(200).json({
      meta: {pagination: pagination},
      factures: factures.rows,
    });
  } catch (e) {
    logger.error(e);
    next(e);
  }
};

factureController.employeeCreateFacture = async (req, res, next) => {
  const params = Object.keys(req.body);
  const allowParams = ['description', 'date', 'amount'];
  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    logger.error('Invalid params');
    return res.status(400).send({error: 'Invalid params'});
  }

  const factureData = req.body;
  const commissionId = req.params.commission;

  logger.info(factureData, 'Facture data from client');
  logger.info(req.file, 'File');
  try {
    logger.info('Storing facture in DB');
    factureData.file = storage(req.file);

    /**
     * Recupera la comisión a la que se le desea agregar la factura de la base
     * de datos si la comisión no es encontrada o la comisión no pertenece
     * al empleado se lanzara un error, en caso contrario el id de la comisión
     * se agregara los datos de la factura para su almacenamiento.
     */
    const commission = await CommissionService.findCommissionByIdAndEmployee(
        commissionId,
        req.employee.id,
    );

    factureData.commissionId = commission.id;

    const facture = await FactureService.createFacture(factureData);
    logger.info(
        facture.toJSON(),
        'Facture stored succesfully, sending to client',
    );
    res.status(201).json({facture: facture});
  } catch (e) {
    next(e);
  }
};

factureController.findFacturesByCommission = async (req, res) => {
  const idCommission = req.params.commission;
  try {
    const factures = await FactureService.findFacturesByCommission(
        idCommission,
    );
    res.status(200).json(factures);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

factureController.findFacturesByEmployee = async (req, res) => {
  const idEmployee = req.params.employee;
  try {
    const employee = await EmployeeService.findEmployeeById(idEmployee);
    if (!employee) {
      throw new Error('Emplooye was not found');
    }
    const factures = await FactureService.findFacturesByEmployee(employee);
    res.status(200).json(factures);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

module.exports = factureController;
