const { StatusCodes } = require('http-status-codes');
const {appError} = require('../utils/app-error');
const {verifyToken} = require('../utils/auth');

async function isAuthenticated(token) {
    try {
        const response = verifyToken(token);
        return response.id; 
    } catch(error) {
        if(error.name === 'JsonWebTokenError') { 
            throw new appError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError') {
            throw new appError('JWT token expired', StatusCodes.BAD_REQUEST);
        }
        throw new appError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    isAuthenticated
}