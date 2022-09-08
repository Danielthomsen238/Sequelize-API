import express from "express";
import { CourseController } from '../Controllers/course.controller.js'

const controller = new CourseController();

const router = express.Router()

router.get('/course', (req, res) => {controller.list(req,res)})
router.get('/course/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/course', (req, res) => {controller.create(req,res)})
router.put('/course/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
router.delete('/course/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

export { router }