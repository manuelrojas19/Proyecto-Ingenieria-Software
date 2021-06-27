const {FactureService, EmployeeService} = require('../services/index.js');
const {logger} = require('../util/logger.js');
const storage = require('../util/storage.js');

const factureController = {};

factureController.employeeFindFacturesByCommission = async (req, res) => {
  const pagination = {};
  pagination.limit = parseInt(req.query.limit ? req.query.limit : 5);
  pagination.offset = parseInt(req.query.offset ? req.query.offset : 0);

  const idCommission = req.params.commission;
  try {
    logger.info('Fetching factures from DB');
    const factures = await FactureService.findFacturesByCommissionAndEmployee(
        idCommission,
        req.employee,
        pagination,
    );
    logger.info(factures, 'Factures founded succesfully, sending to client');
    res.status(200).json({factures: factures});
  } catch (e) {
    logger.error(e);
    res.status(400).json({error: e.message});
  }
};

factureController.createFacture = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = ['factureDescription', 'date', 'amount'];
  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    logger.error('Invalid params');
    return res.status(400).send({error: 'Invalid params'});
  }

  const factureData = req.body;
  factureData.commissionId = req.params.commission;

  logger.info(factureData, 'Facture data from client');
  logger.info(req.file, 'File');
  try {
    logger.info('Storing facture in DB');
    factureData.filePath = storage(req.file);

    const facture = await FactureService.createFacture(
        factureData,
        req.employee,
    );
    logger.info(
        facture.toJSON(),
        'Facture stored succesfully, sending to client',
    );
    res.status(200).json({facture: facture});
  } catch (e) {
    res.status(400).json({error: e.message});
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
