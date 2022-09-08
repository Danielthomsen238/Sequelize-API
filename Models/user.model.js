import {sequelize} from '../Config/db.sequelize.js'
import {DataTypes, Model} from 'sequelize'
import bcrypt from 'bcrypt'

class UserModel extends Model {}

UserModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    lastname: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    telefon: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR,
        allowNull: false
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    underscored: false ,
    createdAt: true,
    updatedAt: true,
    hooks: {
        beforeCreate: async (user, options) => {
            user.Password = await createHash(user.Password)
        },
        beforeUpdate: async (user, options) => {
            user.Password = await createHash(user.Password)
        }
    }
})

/**
 * Funktion that encrypts a string
 * @param {String} string 
 * @returns Hashed string
 */

const createHash = async string => {
    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(string, salt);
    return hashedString;
}

export default UserModel