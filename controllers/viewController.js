const catchAsync = require('../libs/utils/catchAsync');
const AppError = require('../libs/utils/appError');
const Realization = require('../models/realizationModel');

exports.getOverview = async (req, res) => {
  try {
    res.status(200).render('index');
  } catch (err) {
    console.log(err);
  }
};

exports.getRealizations = async (req, res) => {
  try {
    res.status(200).render('realizations');
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findById(req.params.id);

  if (!realization)
    return next(new AppError('Nie znaleziono takiej realizacji', 404));

  res.status(200).render('singleRealization', { realization });
});
