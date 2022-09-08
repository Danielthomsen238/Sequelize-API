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
     role: {
        type: DataTypes.CHAR,
        allowNull: false,
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