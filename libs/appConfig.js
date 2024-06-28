const express = require('express');
const morgan = require('morgan');
const path = require('path');
const viewRouter = require('../routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.enable('trust proxy');

app.use('/', viewRouter);

module.exports = app;
