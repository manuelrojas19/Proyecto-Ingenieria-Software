require('dotenv').config();
const {NODE_ENV, GCLOUD_STORAGE_BUCKET} = process.env;

const FactureService = require('../services/factures_service.js');

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(GCLOUD_STORAGE_BUCKET);

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

  if (NODE_ENV === 'development') {
    factureData.filePath = req.file.path;
  } else if (NODE_ENV == 'production') {
    const blob = bucket.file(req.file.originalName);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });
    blobStream.on('error', (err) => {
      res.status(500).send({message: err.message});
    });
    blobStream.on('finish', () => {
      const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
      );
      factureData.filePath = publicUrl;
    });
    blobStream.end(req.file.buffer);
  }

  try {
    const facture = await FactureService.createFacture(
        factureData,
        req.employee,
    );
    res.status(200).json({facture: facture, file: req.file});
  } catch (e) {
    console.log(e);
    res.status(400).json({error: e.message});
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
    if (NODE_ENV === 'development') {
      res.download(facture.filePath);
    } else if (NODE_ENV === 'production') {
      res.redirect(publicUrl);
    }
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};
