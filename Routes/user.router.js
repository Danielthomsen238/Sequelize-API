import express from "express";
import { UserController } from '../Controllers/User.controller.js'

const controller = new UserController();

const router = express.Router()

router.get('/User', (req, res) => {controller.list(req,res)})
router.get('/User/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/User', (req, res) => {controller.create(req,res)})
router.put('/User', (req, res) => {controller.update(req,res)})


export { router }