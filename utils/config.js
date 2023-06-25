require('dotenv').config();

const { PORT = 3001 } = process.env;
const DATABASE = process.env.DATABASE || 'mongodb://localhost:27017/bitfilmsdb';

module.exports = {
  DATABASE,
  PORT,
};
