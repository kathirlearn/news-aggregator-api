const { StatusCodes } = require('http-status-codes');
const { statusResponse } = require('../utils');
const users = require('../users.json');
const axios = require('axios');
const { NEWS_API_KEY, NEWS_API_URL_TOP } = require("../config");


const getNews = async (req, res) => {
    try {
        const id = req.user;
        const userIndex = users.findIndex((user) => user.id === id);
        let preferences = users[userIndex].preferences;
        // Link formation
        const link = `${NEWS_API_URL_TOP}?country=${preferences.country}&apiKey=${NEWS_API_KEY}`;
        const response = await axios.get(link);
        statusResponse.success.data = response.data.articles
        return res
            .status(StatusCodes.OK)
            .json(statusResponse.success);
    } catch (error) {
        statusResponse.error.error = error;
        console.log(error);
        return res
            .status(error.statusCode)
            .json(statusResponse.error);
    }
}

module.exports = {
    getNews
}