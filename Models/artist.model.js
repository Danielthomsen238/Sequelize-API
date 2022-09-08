import {sequelize} from '../Config/db.sequelize.js'
import {DataTypes, Model} from 'sequelize'

class ArtistModel extends Model {}

ArtistModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "Ikke navngivet"
    }
},{
    sequelize,
    modelName: 'Popo',
    freezeTableName: true,
    underscored: false ,
    createdAt: true,
    updatedAt: true
})

export default ArtistModel