const Realization = require('../models/realizationModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

exports.createRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.create(req.body);

  res.status(200).json({
    status: 'success',
    data: realization,
  });
});
