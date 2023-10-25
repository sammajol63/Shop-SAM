const jwt = require("jsonwebtoken");
require("dotenv").config();

const sign = (payload) => jwt.sign(payload, process.env.SECRET_CODING);
const verifyToken = (token) => jwt.verify(token, process.env.SECRET_CODING);
module.exports = { sign, verifyToken };
