exports.getOverview = async (req, res) => {
  try {
    res.status(200).render('strona');
  } catch (err) {
    console.log(err);
  }
};
