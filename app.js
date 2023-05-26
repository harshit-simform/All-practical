const express = require('express');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { login, register } = require('./userController');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// app.use(express.static(path.join(__dirname, 'css')));
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
app.get('/welcome', async (req, res) => {
  const decodedData = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
  res.render('welcome', {
    userName: decodedData.user.name,
  });
});

app.post('/api/login', login);
app.post('/api/register', register);

module.exports = app;
