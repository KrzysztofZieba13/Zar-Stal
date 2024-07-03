exports.getOverview = async (req, res) => {
  try {
    res.status(200).render('index');
  } catch (err) {
    console.log(err);
  }
};

exports.getRealizations = async (req, res) => {
  try {
    res.status(200).render('realizations');
  } catch (err) {
    console.log(err);
  }
};

exports.getSingleRealization = async (req, res) => {
  try {
    res.status(200).render('singleRealization');
  } catch (err) {
    console.log(err);
  }
};
