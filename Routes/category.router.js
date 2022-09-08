import express from "express";
import { CategoryController } from '../Controllers/category.controller.js'

const controller = new CategoryController();

const router = express.Router()

router.get('/category', (req, res) => {controller.list(req,res)})
router.get('/category/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/category', (req, res) => {controller.create(req,res)})
router.put('/category/:id([0-9]*)', (req, res) => {
    controller.update(req,res)
 })
router.delete('/category/:id([0-9]*)', (req, res) => {
    controller.delete(req,res)
 })

export { router }