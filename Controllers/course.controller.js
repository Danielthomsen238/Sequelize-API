import {Sequelize} from 'sequelize'
import CourseModel from "../Models/course.model.js"
import SchoolModel from "../Models/school.model.js"
import CategoryModel from "../models/category.model.js"

SchoolModel.hasMany(CourseModel)
CourseModel.belongsTo(SchoolModel)
CategoryModel.hasMany(CourseModel)
CourseModel.belongsTo(CategoryModel)


class CourseController {
constructor(){
    console.log("Instance call of Course controller")
}

    list = async (req, res) => {
        const result = await CourseModel.findAll()
        res.json(result)
    }

    get = async (req, res) => {
        const result = await CourseModel.findOne({
            where: { id: req.params.id },
        })
        res.json(result);
    }

    create = async (req,res) =>{
        const { name, description, duration, school_id, user_id, category_id } = req.body;

        if( name && description && duration && school_id && user_id && category_id ){
            const model = await CourseModel.create(req.body);
            return res.json({newId: model.id});
        }else{
            res.send(418);
        }

    }

    update = async (req,res) =>{
        const { name, description, duration, school_id, user_id, category_id } = req.body;

        if( name && description && duration && school_id && user_id && category_id ){
            const model = await CourseModel.update(req.body,{
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

            await CourseModel.destroy({

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

export {CourseController}