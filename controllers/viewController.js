const catchAsync = require('../libs/utils/catchAsync');
const AppError = require('../libs/utils/appError');
const Realization = require('../models/realizationModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  res.status(200).render('index');
});

exports.getRealizations = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find();

  if (!realizations)
    return next(new AppError('Nie znaleziono realizacji ', 404));

  res.status(200).render('realizations', { realizations });
});

exports.getSingleRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findById(req.params.id);

  if (!realization)
    return next(new AppError('Nie znaleziono takiej realizacji', 404));

  res.status(200).render('singleRealization', { realization });
});
