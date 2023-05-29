const express = require('express');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const {
  login,
  register,
  logout,
  isAuthenticated,
} = require('./userController');
const path = require('path');
const cookieParser = require('cookie-parser');
const { I18n } = require('i18n');
const { response } = require('express');

const i18n = new I18n({
  locales: ['en', 'hi'],
  directory: path.join(__dirname, 'translations'),
  defaultLocale: 'en',
});

const app = express();
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/welcome', isAuthenticated, async (req, res) => {
  const decodedData = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  res.render('welcome', {
    userName: decodedData.user.name,
    translatedData: res.__('welcome_key'),
  });
});

app.post('/api/login', login);
app.post('/api/register', register);
console.log('clear all');
app.get('/api/logout', logout);

module.exports = app;
