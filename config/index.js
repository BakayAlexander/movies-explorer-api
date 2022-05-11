const urlRegEx = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;
const {
  NODE_ENV,
  JWT_SECRET,
  DB_ADDRESS = 'mongodb://localhost:27017/moviesdb',
} = process.env;
const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
const SALT_ROUNDS = 10;
const PORT = 3000;

module.exports = {
  SALT_ROUNDS,
  urlRegEx,
  jwtKey,
  DB_ADDRESS,
  PORT,
};
