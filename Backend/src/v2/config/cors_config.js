module.exports = {
  origin: [
    'http://localhost:4200',
    'https://sistema-viaticos.uc.r.appspot.com',
  ],
  methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  allowedHeaders: 'X-Requested-With, content-type',
  credentials: true,
};
