import express from "express";
import { SchoolController } from '../Controllers/school.controller.js'

const controller = new SchoolController();

const router = express.Router()

router.get('/school', (req, res) => {controller.list(req,res)})
router.get('/school/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/school', (req, res) => {controller.create(req,res)})
router.put('/school/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
router.delete('/school/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

export { router }