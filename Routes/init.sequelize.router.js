import express from 'express'
import { sequelize } from '../Config/db.sequelize.js'
import SchoolModel from '../Models/school.model.js'  
import RoleModel from '../Models/role.model.js' 
import UserModel from '../Models/user.model.js'
import CourseModel from '../Models/course.model.js'
import CategoryModel from "../Models/category.model.js" 


const router = express.Router();



router.get('/init', (req,res) => {
    try{
        sequelize.sync();
        res.sendStatus(200);
    }
    catch{
        res.send(err);
    }
})

export { router }