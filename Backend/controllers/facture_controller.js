const FactureService = require('../services/factures_service.js');

exports.findAllFactures = async (req, res) => {
    const factures = await FactureService.findAllFactures();
    res.status(200).json(factures);
}