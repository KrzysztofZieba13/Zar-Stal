const express = require('express');
const morgan = require('morgan');
const path = require('path');
const viewRouter = require('../routes/viewRoutes');
const realizationRouter = require('../routes/realizationRoutes');
const mainPageRouter = require('../routes/mainPageRoutes');
const elementRouter = require('../routes/elementRoutes');
const globalErrorHandler = require('../controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));
app.enable('trust proxy');

app.use('/', viewRouter);
app.use('/api/v1/realizations', realizationRouter);
app.use('/api/v1/elements', elementRouter);
app.use('/api/v1/mainPage', mainPageRouter);
app.use(globalErrorHandler);

module.exports = app;
