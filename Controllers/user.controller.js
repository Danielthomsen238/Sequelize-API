import {Sequelize} from 'sequelize'
import UserModel from "../Models/User.model.js"
import SchoolModel from "../Models/school.model.js"
import RoleModel from "../Models/role.model.js"

SchoolModel.hasMany(UserModel)
UserModel.belongsTo(SchoolModel)
RoleModel.hasMany(UserModel)
UserModel.belongsTo(RoleModel)

class UserController {
constructor(){
    console.log("Instance call of User controller")
}

    list = async (req, res) => {
        const result = await UserModel.findAll({
            include: {
                model: SchoolModel,
                attributes: ['id', 'name']
            }
        })
        res.json(result)
    }

    get = async (req, res) => {
        const result = await UserModel.findOne({
            where: { id: req.params.id }
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { firstname, lastname, telefon, email, password, school_id} = req.body;

        if(firstname && lastname && email && password && telefon && school_id){
            const model = await UserModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.send(418);
        }

    }

    update = async (req,res) =>{
        const { firstname, lastname, telefon, email, password, school_id} = req.body;

        if(firstname && lastname && email && password && telefon && school_id){
            const model = await UserModel.update(req.body,{
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

            await UserModel.destroy({

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

export {UserController}