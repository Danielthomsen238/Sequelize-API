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
        if (
          user._previousDataValues.active === false &&
          user.dataValues.active === true
        ) {
          sendActiveMail(user.email);
        }

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
const sendActiveMail = async (user_email) => {
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailOptions = {
    from: "danielthomsen238@gmail.com", // sender address
    to: `${user_email}`, // list of receivers
    subject: "Bruger er aktiveret", // Subject line
    html: `<p> Din Bruger er blevet Aktiveret </p><p> Du kan nu logge ind og Oprette dig på Kortet</p> `, // plain text body
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
const sendEmail = async (user_email, password) => {
  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  const mailOptions = {
    from: "danielthomsen238@gmail.com", // sender address
    to: `${user_email}`, // list of receivers
    subject: "Engangs kode til Admin-dashboard", // Subject line
    html: `<p>Her er en engangs kode til Admin-dashboard.</p><p> Du kan kun logge ind en gang så husk at ændre din kode.</p><p>${password}</p> `, // plain text body
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        //this shit
        console.log(info);
        resolve(info);
      }
    });
  });
};
module.exports = UserModel;
