const catchAsyncErrors = require('../middlewares/catchAsyncError');
const UserModel = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/sendToken');
// const emailTemplate = require('../utils/emailTemplates')
// const sendEmail = require('../utils/sendEmail');
// const crypto = require('crypto');
// const { delete_file, upload_file } = require('../utils/cloudinary')

// Register User - /api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await UserModel.create({
        name,
        email,
        password
    });

    // const token = user.getJwtToken();

    // res.status(201).json({
    //     // success: true,
    //     token
    // })
    sendToken(user, 201, res)
})

// Login User - /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('please enter the email & password', 400))
    }

    // Find user in the database
    const user = await UserModel.findOne({ email }).select("+password")

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }
    // check if password is correct
    const isPasswordMatched = await user.comparePassword(password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401))
    }

    // const token = user.getJwtToken();

    // res.status(200).json({
    //     // success: true,
    //     token
    // })
    sendToken(user, 200, res)
})

// Logout user = /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
    res.status(200).json({
        message: "Logged Out",
    });
});