const express = require("express")
const { UserController } = require('../Controllers/User.controller.js') 
const verifyToken = require('../Middleware/verifyToken.js') 

const controller = new UserController();

const UserRouter = express.Router()

UserRouter.get('/User', verifyToken, (req, res) => {controller.list(req,res)})
UserRouter.get('/User/:id[0-9]*', (req, res) => {controller.get(req,res)})
UserRouter.post('/User', (req, res) => {controller.create(req,res)})
UserRouter.put('/User', (req, res) => {controller.update(req,res)})


module.exports = { UserRouter }