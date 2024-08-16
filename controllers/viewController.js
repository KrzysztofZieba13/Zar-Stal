const catchAsync = require('../libs/utils/catchAsync');
const AppError = require('../libs/utils/appError');
const Realization = require('../models/realizationModel');
const MainPage = require('../models/mainPageModel');
const Element = require('../models/elementModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  const mainPage = await MainPage.find().populate('mainRealizations');
  if (!mainPage)
    return next(new AppError('Nie znaleziono strony głównej ', 404));

  res.status(200).render('index', { mainPage: mainPage[0] });
});

exports.getRealizations = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find();
  const elements = await Element.find({});

  if (!elements) return next(new AppError('Nie znaleziono realizacji', 404));
  if (!realizations)
    return next(new AppError('Nie znaleziono realizacji ', 404));

  res.status(200).render('realizations', { realizations, elements });
});

exports.getSingleRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findById(req.params.id);

  if (!realization)
    return next(new AppError('Nie znaleziono takiej realizacji', 404));

  res.status(200).render('singleRealization', { realization });
});

exports.getEditDescPage = catchAsync(async (req, res, next) => {
  res.status(200).render('mpEditDesc');
});

exports.getChooseRealizations = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find().select(
    'title primaryImageThumbnail _id',
  );

  res.status(200).render('chooseRealizations', { realizations });
});

exports.getEditOffert = catchAsync(async (req, res, next) => {
  res.status(200).render('editOffert');
});

exports.getEditContact = catchAsync(async (req, res, next) => {
  res.status(200).render('editContact');
});

exports.getCreateRealization = catchAsync(async (req, res, next) => {
  res.status(200).render('createRealization');
});

exports.getEditRealization = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find();

  if (!realizations)
    return next(new AppError('Nie znaleziono realizacji ', 404));

  res.status(200).render('editRealization', { realizations });
});

exports.getDeleteRealization = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find();

  if (!realizations)
    return next(new AppError('Nie znaleziono realizacji ', 404));

  res.status(200).render('deleteRealization', { realizations });
});

exports.getCreateElement = catchAsync(async (req, res, next) => {
  res.status(200).render('createElement');
});

exports.getEditElement = catchAsync(async (req, res, next) => {
  const elements = await Element.find();

  if (!elements) return next(new AppError('Nie znaleziono elementów ', 404));
  res.status(200).render('editElement', { elements });
});

exports.getDeleteElement = catchAsync(async (req, res, next) => {
  const elements = await Element.find();

  if (!elements) return next(new AppError('Nie znaleziono elementów', 404));

  res.status(200).render('deleteElement', { elements });
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
  res.status(200).render('login');
});

exports.getForgotPasswordPage = catchAsync(async (req, res, next) => {
  res.status(200).render('forgotPassword');
});

exports.getRenewPassword = catchAsync(async (req, res, next) => {
  res.status(200).render('newPassword');
});

exports.getChangePassword = catchAsync(async (req, res, next) => {
  res.status(200).render('changePassword');
});
