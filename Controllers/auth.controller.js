const UserModel = require('../Models/User.model.js')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const RoleModel = require("../Models/Role.model.js")


dotenv.config()

RoleModel.hasMany(UserModel)
UserModel.belongsTo(RoleModel)

class AuthController{
    constructor(){
        console.log("Running authentification")
    }
    login = async (req, res) => {

        const {username, password} = req.body;
        
        if(username && password){
            const data = await UserModel.findOne({
                attributes:['id','password', 'firstname'],
                where: {email: username},
                include: {
                    model: RoleModel,
                    attributes: ['id', 'role']
                },
            })
           if(data === null){
            return res.sendStatus(404)
           }
           bcrypt.compare(password, data.password, (err,result) => {
            if(result){
                const payload = {
                    user_id: data.id,
                    firstname: data.firstname,
                    role_id: data.role.id,
                    role: data.role.role

                }
                console.log(payload)
                const token = jwt.sign(payload, process.env.PRIVATE_KEY)
                return res.json({ token : token})
            }else{
                res.sendStatus(401)
            }
        })
        }else{
            res.sendStatus(418)
        }

    }

    protected = async (req, res) =>{
        res.sendStatus(200)
    }
}

module.exports = {AuthController}