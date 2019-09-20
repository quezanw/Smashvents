var dotenv = require('dotenv');
dotenv.config({path: '../.env'});
// console.log(dotenv.config({path: "../.env"}));

module.exports = {
  PSQL_PASSWORD: process.env.PSQL_PASSWORD,
  PSQL_USER: process.env.PSQL_USER,
  PSQL_DATABASE: process.env.PSQL_DATABASE,
  PSQL_HOST: process.env.PSQL_HOST,
  PSQL_PORT: process.env.PSQL_PORT,
  GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  CLOUD_NAME: process.env.CLOUD_NAME
}