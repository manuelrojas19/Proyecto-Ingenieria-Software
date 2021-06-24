require('dotenv').config();
const {GCLOUD_STORAGE_BUCKET} = process.env;

const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const bucket = storage.bucket(GCLOUD_STORAGE_BUCKET);

const cloudStorage = (file) => {
  const date = new Date().toISOString();
  file.originalname = date + file.originalname;
  file.originalname = file.originalname
      .toLowerCase().split(' ').join('-');

  const blob = bucket.file(file.originalname);

  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    console.log(err);
    return;
  });

  blobStream.on('finish', () => {
    console.log('Upload success');
    blob.makePublic();
  });

  const url =
        `https://storage.googleapis.com/download/storage/v1/b/${bucket.name}/o/${blob.name}?alt=media`;

  blobStream.end(file.buffer);

  return url;
};

module.exports = cloudStorage;
