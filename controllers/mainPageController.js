const axios = require('axios');
const MainPage = require('../models/mainPageModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');
const Email = require('../libs/utils/email');

const MAIN_PAGE_ID = '66b220ea071c24c77932dfa0';

// Function to verify reCAPTCHA
const verifyRecaptcha = async (token) => {
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`;

  const response = await axios({ url: recaptchaUrl, method: 'post' });
  return response.data.success;
};

exports.sendHelloWorld = catchAsync(async (req, res, next) => {
  if (req.body.fullName)
    return res.status(200).json({
      status: 'success',
      data: null,
    });

  const recaptchaToken = req.body['g-recaptcha-response'];
  if (recaptchaToken === '')
    res
      .status(400)
      .json({ status: 'error', message: 'Brakuje wymaganego pola' });

  // Verify the reCAPTCHA token
  const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
  if (!isRecaptchaValid) {
    return res.status(400).json({
      status: 'error',
      message: 'reCAPTCHA weryfikacja nie udana. Spróbuj ponownie',
    });
  }

  await new Email({
    name: 'Test',
    email: 'test@test.com',
    data: req.body,
  }).sendHelloWorld();

  res.status(200).json({
    status: 'success',
    data: null,
  });
});

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
