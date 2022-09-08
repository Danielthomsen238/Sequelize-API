import express from "express";
import { RoleController } from '../Controllers/role.controller.js'

const controller = new RoleController();

const router = express.Router()

router.get('/role', (req, res) => {controller.list(req,res)})
router.get('/role/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/role', (req, res) => {controller.create(req,res)})
router.put('/role/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
router.delete('/role/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

export { router }