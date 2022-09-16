const express = require("express")
const { CourseController } = require('../Controllers/course.controller.js') 
const verifyToken = require('../Middleware/verifyToken.js') 

const controller = new CourseController();

const CourseRouter = express.Router()

CourseRouter.get('/course', (req, res) => {controller.list(req,res)})
CourseRouter.get('/course/:id[0-9]*', (req, res) => {controller.get(req,res)})
CourseRouter.post('/course', (req, res) => {controller.create(req,res)})
CourseRouter.put('/course/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
 CourseRouter.delete('/course/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

module.exports = { CourseRouter }