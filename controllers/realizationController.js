const multer = require('multer');
const sharp = require('sharp');
const fs = require('node:fs');
const { promisify } = require('node:util');
const Realization = require('../models/realizationModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

exports.uploadRealizationImages = upload.fields([
  { name: 'images' },
  { name: 'primaryImage', maxCount: 1 },
]);

exports.resizeRealizationImages = catchAsync(async (req, res, next) => {
  let folderId;
  if (req.body.folderId) ({ folderId } = req.body);
  else {
    folderId = Math.round(Math.random() * 1e9);
    fs.mkdirSync(`public/img/realization/${folderId}`);
  }
  const imagesCopy = req.files.images;
  req.body.images = [];

  // 1) Primary Image
  if (req.files.primaryImage) {
    req.body.primaryImage = `${folderId}/realization-wide-primary.jpg`;
    req.body.primaryImageThumbnail = `${folderId}/realization-th-primary.jpg`;
    await sharp(req.files.primaryImage[0].buffer)
      .resize(1524, 857)
      .toFormat('jpeg')
      .toFile(`public/img/realization/${req.body.primaryImage}`);

    await sharp(req.files.primaryImage[0].buffer)
      .resize(801, 451)
      .toFormat('jpeg')
      .toFile(`public/img/realization/${req.body.primaryImageThumbnail}`);
  }

  if (req.files.images) {
    // 2) Other Images
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `${folderId}/realization-wide-${Date.now()}-${i + 1}.jpg`;
        await sharp(file.buffer)
          .resize(1524, 857)
          .toFormat('jpeg')
          .toFile(`public/img/realization/${filename}`);
        req.body.images.push(filename);
      }),
    );
    req.body.images.sort();

    req.body.imagesThumbnails = [];
    await Promise.all(
      imagesCopy.map(async (file, i) => {
        const filename = `${folderId}/realization-th-${Date.now()}-${i + 1}.jpg`;
        await sharp(file.buffer)
          .resize(400, 225)
          .toFormat('jpeg')
          .toFile(`public/img/realization/${filename}`);
        req.body.imagesThumbnails.push(filename);
      }),
    );
    req.body.imagesThumbnails.sort();
  }

  next();
});

exports.createRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.create(req.body);

  res.status(200).json({
    status: 'success',
    data: realization,
  });
});

exports.deleteImages = catchAsync(async (req, res, next) => {
  const { thToRemove } = req.body;
  const { wideToRemove } = req.body;
  const deleteThPromises = thToRemove.map(async (el) => {
    return promisify(fs.unlink)(`public/img/realization/${el}`);
  });
  const deleteWidePromises = wideToRemove.map(async (el) => {
    return promisify(fs.unlink)(`public/img/realization/${el}`);
  });
  await Promise.all(deleteThPromises);
  await Promise.all(deleteWidePromises);

  const realization = await Realization.findByIdAndUpdate(
    req.params.id,
    {
      $pull: {
        images: { $in: wideToRemove },
        imagesThumbnails: { $in: thToRemove },
      },
    },
    { new: true },
  );

  if (!realization) return next(new AppError('Nie znaleziono realizacji', 404));

  res.status(204).json({ status: 'success', data: null });
});

exports.getAllRealizatons = catchAsync(async (req, res, next) => {
  const realizations = await Realization.find();

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
  const update = !req.body.images
    ? req.body
    : {
        $push: {
          images: req.body.images,
          imagesThumbnails: req.body.imagesThumbnails,
        },
      };

  const realization = await Realization.findByIdAndUpdate(
    req.params.id,
    update,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!realization)
    return next(new AppError('Nie znaleziono realizacji.', 404));

  res.status(200).json({ status: 'success', data: realization });
});

exports.deleteRealization = catchAsync(async (req, res, next) => {
  const realization = await Realization.findByIdAndDelete(req.params.id);

  await promisify(fs.rm)(
    `public/img/realization/${realization.images[0].split('/')[0]}`,
    { recursive: true },
  );

  if (!realization)
    return next(new AppError('Nie znaleziono realizacji do usunięcia', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
