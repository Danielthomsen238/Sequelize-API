const { sequelize } = require("../Config/db.sequelize.js");
const { DataTypes } = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const emailjs = require("emailjs-com");
const generator = require("generate-password");

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstname: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    telefon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    otp: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    school_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
  },
  {
    sequelize,
    modelName: "user",
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
      beforeCreate: async (user, options) => {
        user.password = await createHash(user.password);
      },

      beforeUpdate: async (user, options) => {
        if (user.otp === true) {
          const generatePassword = OTP();
          sendEmail(user.email, generatePassword);
          user.otp = await createHash(generatePassword);
          return;
        }
        if (user.password === null) {
          return;
        }
        user.password = await createHash(user.password);
      },
    },
  }
);

/**
 * Funktion that encrypts a string
 * @param {String} string
 * @returns Hashed string
 */

const createHash = async (string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(string, salt);
  return hashedString;
};
const OTP = () => {
  const password = generator.generate({
    length: 10,
    numbers: true,
    uppercase: true,
    lowercase: true,
    strict: true,
  });
  return password;
};
const sendEmail = async (user_email, password) => {
  const data = {
    user_email,
    password,
  };
  emailjs
    .send(`service_ix4m3zi`, `template_64y4mcd`, data, `qgJ7Ycqdm2BsAqhH7`)
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    );
};
module.exports = UserModel;
