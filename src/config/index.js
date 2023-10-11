require("dotenv").config();

const { PORT, JWT_SECRET, JWT_EXPIRY, NEWS_API_KEY, NEWS_API_URL_EVERYTHING, NEWS_API_URL_TOP } = process.env;

module.exports = {
  PORT,
  JWT_SECRET,
  JWT_EXPIRY,
  NEWS_API_KEY,
  NEWS_API_URL_EVERYTHING,
  NEWS_API_URL_TOP,
};
