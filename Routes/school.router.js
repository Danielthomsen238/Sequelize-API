const express = require("express")
const { SchoolController } = require('../Controllers/school.controller.js') 
const verifyToken = require('../Middleware/verifyToken.js') 

const controller = new SchoolController();

const SchoolRouter = express.Router()

SchoolRouter.get('/school', (req, res) => {controller.list(req,res)})
SchoolRouter.get('/school/:id[0-9]*', (req, res) => {controller.get(req,res)})
SchoolRouter.post('/school', (req, res) => {controller.create(req,res)})
SchoolRouter.put('/school/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
 SchoolRouter.delete('/school/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

module.exports = { SchoolRouter }