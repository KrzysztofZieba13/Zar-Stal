const multer = require('multer');
const sharp = require('sharp');
const fs = require('node:fs');
const Realization = require('../models/realizationModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

exports.uploadRealizationImages = upload.array('images');

exports.resizeRealizationImages = catchAsync(async (req, res, next) => {
  const folderId = Math.round(Math.random() * 1e9);
  const imagesCopy = req.files;
  req.body.images = [];
  fs.mkdirSync(`public/img/test/${folderId}`);

  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `${folderId}/realization-wide-${i + 1}.jpg`;
      await sharp(file.buffer)
        .resize(1524, 857)
        .toFormat('jpeg')
        .toFile(`public/img/test/${filename}`);
      req.body.images.push(filename);
    }),
  );

  req.body.imagesThumbnails = [];
  await Promise.all(
    imagesCopy.map(async (file, i) => {
      const filename = `${folderId}/realization-th-${i + 1}.jpg`;
      await sharp(file.buffer)
        .resize(400, 225)
        .toFormat('jpeg')
        .toFile(`public/img/test/${filename}`);
      req.body.imagesThumbnails.push(filename);
    }),
  );

  next();
});

exports.createRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.create(req.body);

  res.status(200).json({
    status: 'success',
    data: realization,
  });
});

exports.getAllRealizatons = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find(req.query);

  if (!realizations)
    return next(new AppError('Nie znaleziono realizacji ', 404));

  res.status(200).json({
    status: 'success',
    length: realizations.length,
    data: realizations,
  });
});

exports.getRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findById(req.params.id);

  if (!realization)
    return next(new AppError('Nie znaleziono takiej realizacji', 404));

  res.status(200).json({
    status: 'success',
    data: realization,
  });
});

exports.updateRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true },
  );

  if (!realization)
    return next(new AppError('Nie znaleziono realizacji.', 404));

  res.status(200).json({ status: 'success', data: realization });
});

exports.deleteRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findByIdAndDelete(req.params.id);

  if (!realization)
    return next(new AppError('Nie znaleziono realizacji do usunięcia', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
