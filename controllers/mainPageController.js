const MainPage = require('../models/mainPageModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

const MAIN_PAGE_ID = '669a606c03ec38e454e94414';

exports.getMainPage = catchAsync(async (req, res, next) => {
  const mainPage = await MainPage.findById(MAIN_PAGE_ID);

  if (!mainPage) return next(new AppError('Nie znaleziono strony!', 404));

  res.status(200).json({
    status: 'success',
    data: mainPage,
  });
});

exports.createMainPage = catchAsync(async (req, res, next) => {
  const mainPage = await MainPage.create(req.body);
  if (!mainPage)
    return next(new AppError('Błąd przy tworzeniu strony głównej', 400));

  res.status(201).json({
    status: 'success',
    data: mainPage,
  });
});

exports.updateMainPage = catchAsync(async (req, res, next) => {
  const mainPage = await MainPage.findByIdAndUpdate(MAIN_PAGE_ID, req.body, {
    runValidators: true,
    new: true,
  });

  if (!mainPage)
    return next(new AppError('Nie znaleziono strony głównej', 404));

  res.status(200).json({
    status: 'success',
    data: mainPage,
  });
});
