import {Sequelize} from 'sequelize'
import RoleModel from "../Models/role.model.js"




class RoleController {
constructor(){
    console.log("Instance call of User controller")
}

    list = async (req, res) => {
        const result = await RoleModel.findAll()
        res.json(result)
    }

    get = async (req, res) => {
        const result = await RoleModel.findOne({
            where: { id: req.params.id },
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { role } = req.body;

        if( role ){
            const model = await RoleModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.send(418);
        }

    }

    update = async (req,res) =>{
        const { role } = req.body;

        if(role){
            const model = await RoleModel.update(req.body,{
                where: { id: req.params.id },
                individualHooks: true
            });
            return res.json({status: true});
        }else{
            res.send(418);
        }

    }

    delete = async (req, res) => {

        try {

            await RoleModel.destroy({

                where: {

                    id: req.params.id

                }

            })

            res.sendStatus(200)

        } catch (error) {

            res.send(error)

           

        }

    }

}

export {RoleController}