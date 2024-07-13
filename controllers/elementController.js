const multer = require('multer');
const sharp = require('sharp');
const fs = require('node:fs');
const { promisify } = require('node:util');
const Element = require('../models/elementModel');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

exports.uploadRealizationImages = upload.array('images');

exports.resizeElementImages = catchAsync(async (req, res, next) => {});
