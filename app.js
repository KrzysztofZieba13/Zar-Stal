const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Environment variables
dotenv.config();
const app = require('./libs/appConfig');

// Connecting to DB
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection succesful!');
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
