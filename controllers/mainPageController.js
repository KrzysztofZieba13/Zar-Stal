const MainPage = require('../models/mainPageModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

const MAIN_PAGE_ID = '66b220ea071c24c77932dfa0';

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

  if (req.body.openhours) {
    const weekOpenhourToEdit = mainPage.openHours.id(
      req.body.openhours['openhourId-1'],
    );
    weekOpenhourToEdit.open = req.body['open-1'] || weekOpenhourToEdit.open;
    weekOpenhourToEdit.close = req.body['close-1'] || weekOpenhourToEdit.close;

    const weekendOpenhourToEdit = mainPage.openHours.id(
      req.body.openhours['openhourId-2'],
    );
    weekendOpenhourToEdit.open =
      req.body['open-2'] || weekendOpenhourToEdit.open;
    weekendOpenhourToEdit.close =
      req.body['close-2'] || weekendOpenhourToEdit.close;

    if (req.body['open-2'] || req.body['close-2']) {
      weekendOpenhourToEdit.isClosed = false;
    }

    weekendOpenhourToEdit.isClosed =
      req.body.saturdayClosed || weekendOpenhourToEdit.isClosed;
  }

  await mainPage.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: mainPage,
  });
});
