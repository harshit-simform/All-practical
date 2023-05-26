const User = require('./userModel');
const validateData = require('./validation');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

exports.register = async (req, res, next) => {
  try {
    // for validating incomming data
    console.log('in register');
    const [result, errorMessage] = validateData(req.body);
    if (!result) throw new Error(errorMessage);

    // for creating new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    res.status(200).json({
      status: 'success',
      message: 'register successful',
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
