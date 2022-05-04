const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');
const { register, login } = require('../middlewares/validations');

const authRoutes = express.Router();

authRoutes.post('/signup', register, createUser);
authRoutes.post('/signin', login, loginUser);

exports.authRoutes = authRoutes;
