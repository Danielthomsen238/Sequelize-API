import db from "../Config/db.config.js"

class SongModel{
    constructor() {
        console.log("Instance call of Song Model ");
    }
    
        GetList = (req, res) => {
            return new Promise((resolve, reject) =>{
            const sql = `SELECT * FROM Post`
            db.query(sql, (err, result) => {
                if(err){
                    reject(res.send(err))
                } else {
                    resolve(result)
                }
            })
        })
    }

    getRecord = (id) => {
        console.log()
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM Post WHERE id = ?";
            db.query(sql, id, (err, result) => {
                if(err){
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}

export default SongModel