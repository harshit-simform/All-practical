const { promisify } = require('util');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { userModel: User } = require('../models');
const validateData = require('../validation');

// api endpoint for login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw Object.assign(new Error('Please provide email and password!'), {
        statusCode: 400,
      });

    const user = await User.findOne({ email: email });

    if (!user || !(await bycrypt.compare(password, user.password)))
      throw Object.assign(new Error(' Invalid email or password!'), {
        statusCode: 401,
      });
    user.password = undefined;
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
    res.cookie('jwt', token);

    res.status(200).json({
      status: 'success',
      message: 'login successful',
      token,
      user,
    });
  } catch (error) {
    const errorCode = error.statusCode ? error.statusCode : 500;
    res.status(errorCode).json({
      status: 'error',
      message: error.message,
    });
  }
};

// api endpoint for register
exports.register = async (req, res, next) => {
  // for validating incomming data
  const [result, errorMessage] = validateData(req.body, 'user');
  try {
    if (!result) throw new Error(errorMessage);

    // for creating new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    res.status(201).json({
      status: 'success',
      message: 'register successful',
      newUser,
    });
  } catch (error) {
    res.status(result === false ? 401 : 500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// api endpoint for logout
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

// api endpoint for checking if user is logged in or not
exports.isAuthenticated = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      req.user = decoded.user;
    } else {
      throw Object.assign(new Error(' You are not Logged in...'), {
        statusCode: 401,
      });
    }
    next();
  } catch (error) {
    res.status(error.statusCode).render('error', {
      message: error.message,
    });
  }
};
