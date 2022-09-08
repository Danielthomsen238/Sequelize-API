import {sequelize} from '../Config/db.sequelize.js'
import {DataTypes, Model} from 'sequelize'

class CategorysModel extends Model {}

CategorysModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    grundskole: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    erhvervsgrunduddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    erhvervsuddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    gymnasiale_uddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    maritime_uddannelser​: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    kunstneriske_uddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    erhvervsakademiuddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    professionsbacheloruddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    universitetsuddannelser: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    erhvervsservice: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    startup_communities: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    funding: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    invest: {
        type: DataTypes.CHAR,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'category',
    freezeTableName: true,
    underscored: false ,
    createdAt: true,
    updatedAt: true
})

export default CategorysModel