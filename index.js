const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./database')
const port = process.env.PORT || 3001
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('SQL CONNECTED');
})

app.get('/getAll', async (req, res) => {
    let sql = `SELECT * FROM coming`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.send({ msg: 'nah', success: false })
        }
        res.send({ success: true, results })

    })
})
app.post('/send', async (req, res) => {
    let { name, email, phoneNumber } = req.body.fields;
    console.log(name, email, phoneNumber);
    let sql = `INSERT INTO coming SET 
    name="${name}",
    email="${email}",
    phoneNumber="${phoneNumber}"`
    let query = await db.query(sql, (err, results) => {
        if (err) {
            res.json({ msg: 'nah', success: false });
            throw err
        };
        res.json({ msg: 'ok', success: true, results });
    })
})

app.listen(port, () => {
    console.log(`Listen on the port ${port}`);
})