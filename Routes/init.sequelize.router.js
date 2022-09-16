const { sequelize } = require('../Config/db.sequelize.js') 
const express = require('express')


const InitRouter = express.Router();



InitRouter.get('/init', (req,res) => {
    try{
        sequelize.sync();
        res.sendStatus(200);
    }
    catch{
        res.send(err);
    }
})

module.exports = { InitRouter }