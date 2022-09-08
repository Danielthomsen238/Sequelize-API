import {sequelize} from '../Config/db.sequelize.js'
import {DataTypes, Model} from 'sequelize'

class SongModel extends Model {}

SongModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Ikke navngivet"
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: true,
    },
    artist_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'song',
    freezeTableName: true,
    underscored: true ,
    createdAt: false,
    updatedAt: false
})

export default SongModel