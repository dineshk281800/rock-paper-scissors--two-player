// create token and save in the cookie
module.exports = (user, statusCode, res) => {
    // Create JWT Token
    const token = user.getJwtToken()

    // options for cookie
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    // console.log(options)
    res.status(statusCode).cookie("token", token, options).json({
        token,
    })
}