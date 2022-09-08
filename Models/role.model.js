import {sequelize} from '../Config/db.sequelize.js'
import {DataTypes, Model} from 'sequelize'

class RoleModel extends Model {}

RoleModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    admin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    user:{
        type: DataTypes.INTEGER,
        allowNull: true,
    }
},{
    sequelize,
    modelName: 'role',
    freezeTableName: true,
    underscored: true ,
    createdAt: false,
    updatedAt: false
})

export default RoleModel