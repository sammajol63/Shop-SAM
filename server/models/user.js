"use strict";
const { hashPassword } = require("../helper/bcrypt");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "categoryId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        unique: { msg: "email must be unique" },
        validate: {
          isEmail: { msg: "incorect email format" },
          notNull: { msg: "email is required" },
          notEmpty: { msg: "email is required" },
        },
      },
      name: { type: DataTypes.STRING, allowNull: false },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password is required" },
          notEmpty: { msg: "password is required" },
          len: {
            msg: "password length minimum 5 character",
            args: [5, 255],
          },
        },
      },
      role: { type: DataTypes.STRING, allowNull: false },
      resetPasswordlink: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};
