import {Sequelize} from 'sequelize'
import ArtistModel from "../Models/Artist.model.js"


class ArtistController {
constructor(){
    console.log("Instance call of Artist controller")
}

    list = async (req, res) => {
        const orderby = [req.query.orderby || 'id']
        orderby.push(req.query.dir || 'ASC')
        const limit = req.query.limit || 10
        const result = await ArtistModel.findAll({
            attributes: ['id','name'],
            order: [orderby],
            limit: Number(limit)
        })
        res.json(result)
        console.log("working")

    }

    get = async (req, res) => {
        const result = await ArtistModel.findAll({
            where: { id: req.params.id},
            attributes: ['id','name']
        })
        res.json(result)
        console.log("working")
    }

    create = async (req, res) => {
        const {name} = req.body

        if(name){
            const model = await ArtistModel.create(req.body)
            res.json({newid:model.id})
        } else{
            res.sendStatus(418)
        }
    }
}

export {ArtistController}