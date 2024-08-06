const Contact = require('../models/contactModel');
const MainPage = require('../models/mainPageModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

exports.createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  if (!contact)
    return next(new AppError('Nie udało się utworzyć kontaktów', 400));

  res.status(201).json({
    status: 'success',
    data: contact,
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findOneAndUpdate({}, req.body, {
    runValidators: true,
    new: true,
  });

  if (!contact)
    return next(new AppError('Nie znaleziono danych kontaktowych', 404));

  const mainPage = await MainPage.findOne({});

  if (!mainPage)
    return next(new AppError('Nie znaleziono strony głównej', 404));

  mainPage.contact = contact._id;
  await mainPage.save({ validateModifiedOnly: true });

  res.status(200).json({
    status: 'success',
    data: contact,
  });
});
