module.exports = {
  'development': {
    httpOnly: true,
    secure: false,
    SameSite: 'Strict',
  },
  'production': {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  },
};
