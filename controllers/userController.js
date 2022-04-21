const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SALT_ROUNDS, jwtKey } = require('../config');
const ConflictError = require('../erros/ConflictError');
const NotFoundError = require('../erros/NotFoundError');
const UnathoriazedError = require('../erros/UnathoriazedError');
const ValidationError = require('../erros/ValidationError');
const { User } = require('../models/userModels');

exports.createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new ConflictError('Пользователь с таким email уже существует'),
      );
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      email,
      password: hash,
      name,
    });
    const userWithoutPassword = await User.findOne({ _id: user._id });
    return res.send(userWithoutPassword);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Введены некорректные данные'));
    }
    return next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email }, '+password');
    if (!existingUser) {
      return next(new UnathoriazedError('Не верный логин или пароль'));
    }
    const compare = await bcrypt.compare(password, existingUser.password);
    if (!compare) {
      return next(new UnathoriazedError('Не верный логин или пароль'));
    }
    const token = jwt.sign({ _id: existingUser._id }, jwtKey, {
      expiresIn: '7d',
    });
    return res.send({ token });
  } catch (err) {
    return next(err);
  }
};

exports.getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.send(user);
    }
    return next(new NotFoundError('Пользователь не найден'));
  } catch (err) {
    return next(err);
  }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    if (!email || !name) {
      return next(new ValidationError('Введены некорректные данные'));
    }
    const result = await User.findByIdAndUpdate(
      req.user._id,
      { email, name },
      { new: true, runValidators: true },
    );
    if (result) {
      return res.send(result);
    }
    return next(new NotFoundError('Пользователь не найден'));
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new ValidationError('Введены некорректные данные'));
    }
    if (err.code === 11000) {
      return next(
        new ConflictError('Пользователь с таким email уже существует'),
      );
    }
    return next(err);
  }
};
