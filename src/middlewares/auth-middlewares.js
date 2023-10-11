const { StatusCodes } = require('http-status-codes');
const { statusResponse, appError, userAuth } = require('../utils');

function validateCreateUser(req, res, next) {

    error_explaination = [];
    if (!req.body.fullname) {
        error_explaination.push('Full name not found');
    }
    if (!req.body.username) {
        error_explaination.push('User name not found');
    }
    if (!req.body.password) {
        error_explaination.push('Password not found');
    }
    if (!req.body.email) {
        error_explaination.push('Email Id not found');
    }
    if (error_explaination.length > 0) {
        statusResponse.error.message = 'Something went wrong while creating the user';
        statusResponse.error.error = new appError(error_explaination, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(statusResponse.error);
    }
    next();
}

function validateAuthRequest(req, res, next) {
    error_explaination = [];
    if (!req.body.username) {
        error_explaination.push('Username not found');
    }
    if (!req.body.password) {
        error_explaination.push('password not found');
    }
    if (error_explaination.length > 0) {
        statusResponse.error.message = 'Something went wrong while creating the user';
        statusResponse.error.error = new appError(error_explaination, StatusCodes.BAD_REQUEST);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(statusResponse.error);
    }
    next();
}

async function checkAuth(req, res, next) {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            throw new appError('Missing JWT token', StatusCodes.BAD_REQUEST);
        }
        const response = await userAuth.isAuthenticated(token);
        if (response) {
            req.user = response;
            next();
        }
    } catch (error) {
        statusResponse.error.error = error.explanation
        return res
            .status(error.statusCode)
            .json(statusResponse.error);
    }

}



module.exports = {
    validateCreateUser,
    validateAuthRequest,
    checkAuth,
}