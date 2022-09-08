import {Sequelize} from 'sequelize'
import { sequelize } from '../Config/db.sequelize.js';
import ArtistModel from '../Models/Artist.model.js';
import SongModel from "../Models/song.model.js"
const Op = Sequelize.Op;

class SongController {
constructor(){
    console.log("Instance call of song controller")
}

    list = async (req, res) => {
        const orderby = [req.query.orderby || 'id']
        orderby.push(req.query.dir || 'ASC')
        const limit = req.query.limit || 10
        const result = await SongModel.findAll({
            attributes: ['id','title','artist_id'],
            order: [orderby],
            limit: Number(limit)
        })
        res.json(result)
        console.log("working")

    }

    get = async (req, res) => {
        const result = await SongModel.findAll({
            where: { id: req.params.id},
            attributes: ['id','title','artist_id']
        })
        res.json(result)
        console.log("working")
    }

    serach = async(req, res ) => {
        const result = await SongModel.findAll({
            where:{
                title: {
                    [Op.like]: `%${req.query.keyword}%`
                }
                
            },
        attributes: ['id','title'],
        include: {
            model: ArtistModel,
            attributes: ['id', 'name']
        }
        })
        res.json(result);
    }

    create = async (req, res) => {
        const {title,content,artist_id} = req.body

        if(title && content && artist_id){
            const model = await SongModel.create(req.body)
            res.json({newid:model.id})
        } else{
            res.sendStatus(418)
        }
    }
}

export {SongController}