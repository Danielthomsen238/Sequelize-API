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
    title: {
        type: DataTypes.CHAR,
        allowNull: false,
    },
    
},{
    sequelize,
    modelName: 'category',
    freezeTableName: true,
    underscored: true ,
    createdAt: true,
    updatedAt: true
})

export default CategorysModel