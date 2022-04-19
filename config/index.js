const urlRegEx = /(https*:\/\/)([\w-]{1,32}\.[\w-]{1,32})[^\s@]*#*/m;
const { NODE_ENV, JWT_SECRET } = process.env;
const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';
const SALT_ROUNDS = 10;

module.exports = { SALT_ROUNDS, urlRegEx, jwtKey };
