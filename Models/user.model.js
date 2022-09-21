const { sequelize } = require("../Config/db.sequelize.js");
const { DataTypes } = require("sequelize");
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
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
  var transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
      user: "danielthomsen238@gmail.com",
      pass: "pLUwjIW9D1BVmdz4",
    },
  });
  const mailOptions = {
    from: "danielthomsen238@gmail.com", // sender address
    to: `${user_email}`, // list of receivers
    subject: "Engangs kode til Admin-dashboard", // Subject line
    html: `<p>Her er en engangs kode til Admin-dashboard.</p><p> Du kan kun logge ind en gang så husk at ændre din kode</p><p>${password}</p> `, // plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
module.exports = UserModel;
