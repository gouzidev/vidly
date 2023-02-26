const express = require("express")
require("dotenv").config()
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
const app = express()

// read genres  R
app.get("/genres", (req, res) => {
    url = `${req.protocol}://${req.get('host')}${req.originalUrl}`
   res.send(genres)
})
// read genre by ID
app.get("/genres/:id", (req, res) => {
    let genreId = req.params.id
    let genre = genres.find((genre) => genre.id == genreId)
    // if it exists already => error 400 = bad request
    if (!genre)  return res.status(404).send("genre not found")
    return res.send(genre)
})
// create genre
app.post("/genres" , (req, res) => {
    let genreDummy = {id : genres.length + 1, name : "dummy"}
    let genre = genres.find((genre) => genre.name == genreDummy.name)
    if (genre)  return res.status(400).send("genre exists")
    genres.push(genreDummy) 
    return res.send(genreDummy)
})
// update genre
app.put("/genres/:id" , (req, res) => {
    let genre = genres.find((genre) => genre.id == req.params.id)
    if (genre)  {
        genre.name = req.query.name
    }
    res.send(genre)
})
//delete genre (carefull cause req.params.id is str not id)
app.delete("/genres/:id" , (req, res) => {
    let genre = genres.find((genre) => genre.id == req.params.id)
    if (genre)  {
        genres = genres.filter((genre) => genre.id !== parseInt(req.params.id))
        return res.send(genres)
    }
    return res.status(404).send("genre not found")
})



let port = process.env.PORT || 8888
app.listen( port , () => console.log(`server running on port ${port}`))
