
const express = require("express")
const { RoleController } = require('../Controllers/role.controller.js') 
const verifyToken = require('../Middleware/verifyToken.js') 

const controller = new RoleController();

const RoleRouter = express.Router()

RoleRouter.get('/role', (req, res) => {controller.list(req,res)})
RoleRouter.get('/role/:id[0-9]*', (req, res) => {controller.get(req,res)})
RoleRouter.post('/role', (req, res) => {controller.create(req,res)})
RoleRouter.put('/role/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
 RoleRouter.delete('/role/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

module.exports = { RoleRouter }