const express = require('express');
const router = express.Router();

const { userController,newsController } = require('../controllers');
const {authMiddlewares} = require('../middlewares');

router.post('/register',authMiddlewares.validateCreateUser,userController.signup);
router.post('/login',authMiddlewares.validateAuthRequest,userController.signin);
router.put('/preferences',authMiddlewares.checkAuth,userController.createUserPreference);
router.get('/preferences',authMiddlewares.checkAuth,userController.getUserPreference);
router.get('/news',authMiddlewares.checkAuth,newsController.getNews);

module.exports = router;