const express = require('express');

const { getUserMe, updateUserProfile } = require('../controllers/userController');
const { validateProfile } = require('../middlewares/validations');

const usersRoutes = express.Router();

usersRoutes.get('/me', getUserMe);
usersRoutes.patch('/me', validateProfile, updateUserProfile);

exports.usersRoutes = usersRoutes;
