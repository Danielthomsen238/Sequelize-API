const { sequelize } = require("../Config/db.sequelize.js");
const { DataTypes } = require("sequelize");
const { Model } = require("sequelize");

class CategorysModel extends Model {}

CategorysModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "category",
    freezeTableName: true,
    underscored: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = CategorysModel;
