const AppError = require('../libs/utils/appError');

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Niepoprawnie wprowadzone dane. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api'))
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  //TODO: make the same for rendered website
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational) {
      // operational, trusted error
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // programming error, don't leak error details
    return res.status(500).json({
      status: 'error',
      message: 'Coś poszło nie tak! Spróbuj ponownie później',
    });
  }
  //TODO: make the same for rendered website
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, req, res);
  }
};
