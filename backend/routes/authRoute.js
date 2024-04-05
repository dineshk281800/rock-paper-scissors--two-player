const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
// const authMiddleware = require('../middlewares/auth')

router.route('/register')
    .post(authController.registerUser)
router.route('/')
    .post(authController.loginUser)
router.route('/logout')
    .get(authController.logoutUser)

module.exports = router;