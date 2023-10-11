const { StatusCodes } = require('http-status-codes');
const { statusResponse, appError, fsAccess, auth } = require('../utils');
const bcrypt = require('bcryptjs');
const users = require('../users.json');
const defaultPreferences = { country: 'in' };

const signup = async (req, res) => {
    try {
        const fullname = req.body.fullname;
        const username = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
        const preferences = req.body.preferences || defaultPreferences;

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const isEmailTaken = users.some((user) => user.email === email);
        const isUsernameTaken = users.some((user) => user.username === username);
        if (isEmailTaken || isUsernameTaken) {
            throw new appError('Username or email already exists', StatusCodes.BAD_REQUEST);
        }
        const newUser = {
            id: users.length + 1,
            fullname,
            username,
            password: hashedPassword,
            preferences: preferences,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        users.push(newUser);
        fsAccess.saveTasks(users);
        statusResponse.success.data = newUser;
        return res
            .status(StatusCodes.CREATED)
            .json(statusResponse.success);

    } catch (error) {
        statusResponse.error.error = error;
        return res
            .status(error.statusCode)
            .json(statusResponse.error);
    }
}



const signin = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;


        const user = users.find(user => user.username === username);
        if (!user) {
            throw new appError('Username does not exists', StatusCodes.BAD_REQUEST);
        }
        const passwordMatch = auth.checkPassword(password, user.password);
        if (!passwordMatch) {
            throw new appError('Invalid password', StatusCodes.BAD_REQUEST);
        }
        const jwt = auth.createToken({ id: user.id, email: user.email });
        statusResponse.success.data = jwt;
        return res
            .status(StatusCodes.CREATED)
            .json(statusResponse.success);

    } catch (error) {
        statusResponse.error.error = error;
        return res
            .status(error.statusCode)
            .json(statusResponse.error);
    }
}

const createUserPreference = async (req, res) => {
    try {
        const id = req.user;
        const preferences = req.body;

        const userIndex = users.findIndex((user) => user.id === id);
        users[userIndex] = { ...users[userIndex], ...preferences };
        fsAccess.saveTasks(users);
        statusResponse.success.data = users[userIndex];
        return res
            .status(StatusCodes.OK)
            .json(statusResponse.success);
    } catch (error) {
        statusResponse.error.error = error;
        return res
            .status(error.statusCode)
            .json(statusResponse.error);
    }
}

const getUserPreference = async (req, res) => {
    try {
        const id = req.user;
        const userIndex = users.findIndex((user) => user.id === id);
        statusResponse.success.data = users[userIndex];
        return res
            .status(StatusCodes.OK)
            .json(statusResponse.success);
    } catch (error) {
        statusResponse.error.error = error;
        return res
            .status(error.statusCode)
            .json(statusResponse.error);
    }
}

module.exports = {
    signup,
    signin,
    createUserPreference,
    getUserPreference
}