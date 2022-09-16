
const express = require("express")
const { AuthController } = require('../Controllers/Auth.controller.js') 
const verifyToken = require('../Middleware/verifyToken.js' )

const controller = new AuthController();

const AuthRouter = express.Router()

AuthRouter.post('/Login', (req, res) => {controller.login(req,res)})
AuthRouter.post('/Protected', verifyToken , (req, res) => {controller.protected(req,res)})


module.exports = { AuthRouter }