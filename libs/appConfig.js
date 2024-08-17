const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const enforce = require('express-sslify');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const { xss } = require('express-xss-sanitizer');

const viewRouter = require('../routes/viewRoutes');
const realizationRouter = require('../routes/realizationRoutes');
const mainPageRouter = require('../routes/mainPageRoutes');
const elementRouter = require('../routes/elementRoutes');
const contactRouter = require('../routes/contactRoutes');
const userRouter = require('../routes/userRoutes');
const globalErrorHandler = require('../controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

// if (process.env.NODE_ENV === 'production') app.use(enforce.HTTPS());

app.use(helmet({ crossOriginEmbedderPolicy: false }));

const scriptSrcUrls = [
  'https://unpkg.com/',
  'https://tile.openstreetmap.org',
  'https://*.cloudflare.com',
];
const styleSrcUrls = [
  'https://unpkg.com/',
  'https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/',
  'https://tile.openstreetmap.org',
  'https://fonts.googleapis.com/',
];
const connectSrcUrls = [
  'https://unpkg.com',
  'https://tile.openstreetmap.org',
  'https://bundle.js:*',
  'ws://127.0.0.1:*/',
];
const fontSrcUrls = [
  'https://unpkg.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", ...fontSrcUrls],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:', ...scriptSrcUrls],
      frameSrc: ["'self'", 'https://js.stripe.com', 'https://www.google.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
      workerSrc: ["'self'", 'blob:', 'https://m.stripe.network'],
      childSrc: ["'self'", 'blob:'],
      imgSrc: ["'self'", 'blob:', 'data:', 'https:'],
      formAction: ["'self'"],
      connectSrc: [
        "'self'",
        "'unsafe-inline'",
        'data:',
        'blob:',
        ...connectSrcUrls,
      ],
      upgradeInsecureRequests: [],
    },
  }),
);

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Za dużo żądań. Spróbuj ponownie za godzinę.',
});
app.use('/api', limiter);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.enable('trust proxy');

app.use('/', viewRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/realizations', realizationRouter);
app.use('/api/v1/elements', elementRouter);
app.use('/api/v1/mainPage', mainPageRouter);
app.use('/api/v1/contacts', contactRouter);
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Nie znaleziono trasy ${req.originalUrl} na tym serwerze!`,
      404,
    ),
  );
});
app.use(globalErrorHandler);

module.exports = app;
