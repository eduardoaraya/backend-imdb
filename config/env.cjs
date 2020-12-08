const dotenv = require('dotenv');
const path = require('path');

const envPath = process.env.NODE_ENV === 'develop' ?
  path.resolve(__dirname, '../.env.develop') :
  path.resolve(__dirname, '../.env');

dotenv.config({
  path: envPath
});