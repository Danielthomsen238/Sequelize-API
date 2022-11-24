const { sequelize } = require("../Config/db.sequelize.js");
const DataTypes = require("sequelize");
const { Model } = require("sequelize");

class SchoolModel extends Model {}

SchoolModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    address: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    telefon: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_up_community: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    hub: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    image: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "school",
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = SchoolModel;
