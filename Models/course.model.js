const { sequelize } = require('../Config/db.sequelize.js') 
const DataTypes = require('sequelize')
const Model = require('sequelize')

class CoursesModel extends Model {}

CoursesModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    description: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    duration: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'course',
    freezeTableName: true,
    underscored: true ,
    createdAt: true,
    updatedAt: true
})

export default CoursesModel