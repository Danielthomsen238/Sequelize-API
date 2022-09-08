import express from "express";
import { SongController } from '../Controllers/song.controller.js'

const controller = new SongController();

const router = express.Router()

router.get('/song', (req, res) => {controller.list(req,res)})
router.get('/song/search', (req, res) => {controller.serach(req,res)})
router.get('/song/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/song', (req, res) => {controller.create(req,res)})

export { router }