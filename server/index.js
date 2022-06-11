const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "CRUD_React"
})

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())

app.get('/get', (req, res) => {
    const getQuery = "SELECT * FROM `animes`";
    db.query(getQuery, (err, result) =>{
        res.send(result)
    })
})

app.post('/insert', (req, res) => {
    const animeName = req.body.animeName;
    const animeReview = req.body.animeReview;

    const insertQuery = "INSERT INTO `animes`(`anime_name`, `anime_review`) VALUES (?,?)"
    db.query(insertQuery, [animeName, animeReview], (err, result) => {
        res.send('Sucess!')
    })
})

app.delete('/delete/:animeDel', (req, res) => {
    const anime = req.params.animeDel;
    const deleteQuery = "DELETE FROM `animes` WHERE anime_name = ?";
    db.query(deleteQuery, [anime], (err, result) =>{
        if(err){console.log(err)}
    })
})

app.put('/update', (req, res) => {
    const anime = req.body.anime
    const review = req.body.updatedRev

    const updateQuery = "UPDATE animes SET anime_review = ? WHERE anime_name = ?"

    db.query(updateQuery, [review, anime], (err, result) => {
        if(err) console.log(err)
    })
})
app.listen(3001, () => {
    console.log('server running!!')
})