const express = require('express');
const { I18n } = require('i18n');
const cookieParser = require('cookie-parser');
const path = require('path');

const {
  login,
  register,
  logout,
  isAuthenticated,
} = require('./controllers/userController');
const {
  createFeedback,
  getAllFeedback,
  getFeedback,
  userFeedback,
  averageRating,
  categoryData,
} = require('./controllers/feedbackController');

const i18n = new I18n({
  locales: ['en', 'hi'],
  directory: path.join(__dirname, 'translations'),
  defaultLocale: 'en',
});

const app = express();
// using various built-in middleware for parsing cookie serving static files and a bodyParser for parsing data into req.body
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

// routes for client side
app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/welcome', isAuthenticated, async (req, res) => {
  res.render('welcome', {
    userName: req.user.name,
    translatedData: res.__('welcome_key'),
  });
});
app.get('/feedback', isAuthenticated, async (req, res) => {
  res.render('feedbackForm');
});
app.get('/user_feedback', isAuthenticated, userFeedback);

// routes for api(backend)

app.post('/api/login', login);
app.post('/api/register', register);
app.get('/api/logout', logout);
app.post('/api/feedback', isAuthenticated, createFeedback);
app.get('/api/feedback', getAllFeedback);
app.get('/api/feedback/:id', getFeedback);
app.get('/api/averageRating/:id', averageRating);
app.get('/api/averageRatingCategory', categoryData);

// for all routes that has not been defined
app.all('*', (req, res) => {
  res.render('error', {
    message: 'This route is not defined yet!!!',
  });
});

module.exports = app;
