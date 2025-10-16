function errorHandler(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err && err.stack ? err.stack : err);
  const status = err && err.status ? err.status : 500;
  const message = err && err.message ? err.message : 'Internal server error';
  res.status(status).json({ success: false, error: message });
}

module.exports = errorHandler;


