const multer = require('multer');
const sharp = require('sharp');
const fs = require('node:fs');
const { promisify } = require('node:util');
const Element = require('../models/elementModel');
const AppError = require('../libs/utils/appError');
const catchAsync = require('../libs/utils/catchAsync');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

exports.uploadRealizationImages = upload.array('images');

exports.resizeElementImages = catchAsync(async (req, res, next) => {
  req.body.images = [];

  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `element-${Date.now()}-${i + 1}.jpg`;
      await sharp(file.buffer)
        .resize(1524, 857)
        .toFormat('jpeg')
        .toFile(`public/img/realization/steel-elements/${filename}`);
      req.body.images.push(filename);
    }),
  );
  req.body.images.sort();

  req.body.imagesThumbnails = [];
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `element-${Date.now()}-${i + 1}.jpg`;
      await sharp(file.buffer)
        .resize(335, 206)
        .toFormat('jpeg')
        .toFile(`public/img/realization/steel-elements/${filename}`);
      req.body.imagesThumbnails.push(filename);
    }),
  );
  req.body.imagesThumbnails.sort();

  next();
});

exports.getElement = catchAsync(async (req, res, next) => {
  const element = await Element.findById(req.params.id);

  if (!element)
    return next(
      new AppError(
        'Nie znaleziono elementu stalowego o podanym identyfikatorze',
        404,
      ),
    );

  res.status(200).json({
    status: 'success',
    data: element,
  });
});

exports.createElement = catchAsync(async (req, res, next) => {
  const element = await Element.create(req.body);

  res.status(201).json({
    status: 'success',
    data: element,
  });
});

exports.updateElement = catchAsync(async (req, res, next) => {
  let update = {};
  if (req.body.title) update.title = req.body.title;
  if (req.body.category && req.body.category !== 'none')
    update.category = req.body.category;

  if (!Array.isArray(req.body.imagesRemove) && req.body.imagesRemove) {
    req.body.imagesRemove = [req.body.imagesRemove];
    req.body.imagesThumbnailsRemove = [req.body.imagesThumbnailsRemove];
  }

  if (req.body.imagesRemove) {
    update = {
      ...update,
      $pull: {
        images: { $in: req.body.imagesRemove },
        imagesThumbnails: { $in: req.body.imagesThumbnailsRemove },
      },
    };
  } else if (req.body.images.length > 0) {
    update = {
      ...update,
      $push: {
        images: req.body.images,
        imagesThumbnails: req.body.imagesThumbnails,
      },
    };
  }

  const element = await Element.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });

  if (!element)
    return next(
      new AppError(
        'Nie znaleziono elementu stalowego o takim identyfikatorze',
        404,
      ),
    );

  if (req.body.imagesRemove && req.body.imagesThumbnailsRemove) {
    const deleteThPromises = req.body.imagesRemove.map(async (el) => {
      return promisify(fs.unlink)(
        `public/img/realization/steel-elements/${el}`,
      );
    });
    const deleteWidePromises = req.body.imagesThumbnailsRemove.map(
      async (el) => {
        return promisify(fs.unlink)(
          `public/img/realization/steel-elements/${el}`,
        );
      },
    );

    await Promise.all(deleteThPromises);
    await Promise.all(deleteWidePromises);
  }
  res.status(200).json({
    status: 'success',
    data: element,
  });
});

exports.deleteElement = catchAsync(async (req, res, next) => {
  const element = await Element.findByIdAndDelete(req.params.id);
  if (!element)
    return next(
      new AppError(
        'Nie znaleziono elementu stalowego o podanym identyfikatorze',
        404,
      ),
    );

  const deleteThPromises = element.images.map(async (el) => {
    return promisify(fs.unlink)(`public/img/realization/steel-elements/${el}`);
  });
  const deleteWidePromises = element.imagesThumbnails.map(async (el) => {
    return promisify(fs.unlink)(`public/img/realization/steel-elements/${el}`);
  });

  await Promise.all(deleteThPromises);
  await Promise.all(deleteWidePromises);

  res.status(204).json({
    status: 'success',
    data: element,
  });
});
