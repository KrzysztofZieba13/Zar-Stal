const Realization = require('../models/realizationModel');

exports.createRealization = async (req, res) => {
  try {
    const realization = await Realization.create(req.body);

    res.status(200).json({
      status: 'success',
      data: realization,
    });
  } catch (err) {
    console.log(err);
  }
};
