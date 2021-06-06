const FactureService = require('../services/factures_service.js');

exports.findAllFactures = async (req, res) => {
  try {
    const factures = await FactureService.findAllFactures();
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
  try {
    const facture = await FactureService.createFacture(
        factureData,
        req.employee,
    );
    res.status(200).json(facture);
  } catch (e) {
    console.log(e);
    res.status(400).json({error: e.message});
  }
};
