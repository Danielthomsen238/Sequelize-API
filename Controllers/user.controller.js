const UserModel = require("../Models/user.model.js")
const SchoolModel = require("../Models/school.model.js")
const RoleModel = require("../Models/role.model.js")

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
            attributes:['id', 'firstname', "lastname", "telefon", "email", "active", "role_id" ],
            include: {
                model: SchoolModel,
                attributes: ['id', 'name']
            }
        })
        res.json(result)
    }

    get = async (req, res) => {
        const result = await UserModel.findOne(
            {
            attributes:['id', 'firstname', "lastname", "telefon", "email", "active", "role_id" ],
            where: { id: req.params.id },
            include: {
                model: SchoolModel,
                attributes: ['id', 'name']
            }
            
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { firstname, lastname, telefon, email, password, school_id} = req.body;

        if(firstname && lastname && telefon && email && password && school_id){
            const model = await UserModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.sendStatus(418);
        }

    }

    update = async (req,res) =>{
        const { firstname, lastname, telefon, email, role_id, active } = req.body;

        if(firstname && lastname && telefon && email, role_id && active ){
            const model = await UserModel.update(req.body,{
                where: { id: req.body.id },
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

module.exports = {UserController}