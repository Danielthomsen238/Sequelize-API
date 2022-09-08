import express from "express";
import { ArtistController } from '../Controllers/artist.controller.js'

const controller = new ArtistController();

const router = express.Router()

router.get('/artist', (req, res) => {controller.list(req,res)})
router.get('/artist/:id[0-9]*', (req, res) => {controller.get(req,res)})
router.post('/artist', (req, res) => {controller.create(req,res)})

export { router }