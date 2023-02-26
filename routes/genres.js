const express = require("express")
const router = express.Router()

let genres = [
    {
       id: 1,
       name: "action"
    },
    {
       id: 2,
       name: "drama"
    },
    {
       id: 3,
       name: "comedy"
    },
    {
       id: 4,
       name: "romance"
    }
 ]

// read genres
router.get("/", (req, res) => {
    res.send(genres)
 })
 
// read genre by ID
router.get("/:id", (req, res) => {
    let genreId = req.params.id
    let genre = genres.find((genre) => genre.id == genreId)
    // if it exists already => error 400 = bad request
    if (!genre)  return res.status(404).send("genre not found")
    return res.send(genre)
})
// create genre
router.post("/" , (req, res) => {
    let newGenre = {id : genres.length + 1, name : req.query.name}
    let genre = genres.find((genre) => genre.name == newGenre.name)
    if (genre)  return res.status(400).send("genre exists")
    genres.push(newGenre) 
    return res.send(newGenre)
})
// update genre
router.put("/:id" , (req, res) => {
    let genre = genres.find((genre) => genre.id == req.params.id)
    if (genre)  {
        genre.name = req.query.name
    }
    res.send(genre)
})
//delete genre (carefull cause req.params.id is str not id)
router.delete("/:id" , (req, res) => {
    let genre = genres.find((genre) => genre.id == req.params.id)
    if (genre)  {
        genres = genres.filter((genre) => genre.id !== parseInt(req.params.id))
        return res.send(genres)
    }
    return res.status(404).send("genre not found")
})

module.exports = router