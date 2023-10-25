const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../helper/jwt");
const { User, Product } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "You are not Authorized" };
    }
    const validateToken = verifyToken(access_token);
    if (!validateToken) {
      throw { name: "Invalid Token" };
    }
    const data = await User.findByPk(validateToken.id);
    if (!data) {
      throw { name: "You are not Authorized" };
    }
    req.data = validateToken;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const authorization = async (req, res, next) => {
  try {
    const { role } = req.data;
    if (role === "admin") {
      next();
    } else {
      throw { name: "penyusup" };
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { authentication, authorization };
