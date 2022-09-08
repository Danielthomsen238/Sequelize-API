import UserModel from '../Models/user.model.js'
import dotevn from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotevn.config()

class AuthController{
    constructor(){
        console.log("Running authentification")
    }
    login = async (req, res) => {
        console.log(req.body);
        const {username, password} = req.body;

        if(username && password){
            const data = await UserModel.findOne({
                attributes:['id','Password'],
                where: {Email: username}
            })
            console.log(data)

            

            bcrypt.compare(password, data.Password, (err,result) => {
                if(result){
                    const token = jwt.sign(data.id, process.env.PRIVATE_KEY)
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

export {AuthController}