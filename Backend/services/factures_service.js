const {Facture} = require('../models/index.js');

exports.findAllFactures = async () => {
    const factures = await Facture.findAll();
    return factures;
}
