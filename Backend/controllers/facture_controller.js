const FactureService = require('../services/factures_service.js');

exports.findAllFactures = async (req, res) => {
  try {
    const factures = await FactureService.findAllFactures();
    res.status(200).json(factures);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.findFacturesByCommissionAndEmployee = async (req, res) => {
  const idCommission = req.params.commission;
  try {
    const factures = await FactureService.findFacturesByCommissionAndEmployee(
        idCommission,
        req.employee,
    );
    res.status(200).json(factures);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};

exports.findFacturesByCommission = async (req, res) => {
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

exports.createFacture = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = ['factureDescription', 'date', 'amount', 'commissionId'];

  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }

  const factureData = req.body;
  factureData.filePath = req.file.path;
  try {
    const facture = await FactureService.createFacture(
        factureData,
        req.employee,
    );
    res.status(200).json({facture: facture, file: req.file});
  } catch (e) {
    console.log(e);
    res
        .header('Access-Control-Allow-Origin', '*')
        .status(400)
        .json({error: e.message});
  }
};

exports.downloadFacture = async (req, res) => {
  try {
    const idFacture = req.params.id;
    const facture = await FactureService.findFacturesByIdAndEmployee(
        idFacture,
        req.employee,
    );
    if (!facture) {
      return res.status(400).send({error: 'Facture does not exists'});
    }
    res.
        header('Access-Control-Allow-Origin', '*').download(facture.filePath);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};
