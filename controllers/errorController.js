const fs = require('node:fs');
const { promisify } = require('node:util');
const AppError = require('../libs/utils/appError');

const deleteImagesElement = async (req) => {
  const { images, imagesThumbnails } = req.body;

  const deleteThPromises = images.map(async (el) => {
    return promisify(fs.unlink)(`public/img/realization/elements/${el}`);
  });
  const deleteWidePromises = imagesThumbnails.map(async (el) => {
    return promisify(fs.unlink)(`public/img/realization/elements/${el}`);
  });
  await Promise.all(deleteThPromises);
  await Promise.all(deleteWidePromises);
};

const deleteImagesRealization = async (req) => {
  await promisify(fs.rm)(`public/img/realization/${req.body.folderId}`, {
    recursive: true,
  });
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Niepoprawnie wprowadzone dane. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = async (err, req, res) => {
  if (req.body.images) {
    if (req.originalUrl.endsWith('elements')) deleteImagesElement(req);
    if (req.originalUrl.endsWith('realizations')) deleteImagesRealization(req);
  }
  // A) API
  if (req.originalUrl.startsWith('/api'))
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  // B) RENDERED WEBSITE
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Coś poszło nie tak!',
      msg: err.message,
      errorCode: err.statusCode,
    });
  }
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
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Coś poszło nie tak!',
      msg: err.message,
      errorCode: err.statusCode,
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    sendErrorProd(error, req, res);
  }
};
