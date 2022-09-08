import express from 'express'
import { sequelize } from '../Config/db.sequelize.js'

const router = express.Router();

import SongModel from '../Models/song.model.js'  
import ArtistModel from '../Models/artist.model.js' 
import UserModel from '../Models/user.model.js' 

router.get('/init', (req,res) => {
    try{
        sequelize.sync();
        res.sendStatus(200);
    }
    catch{
        res.send(err);
    }
})

export { router }