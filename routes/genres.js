const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

mongoose.set("strictQuery", true)
mongoose.connect("mongodb://localhost/mern").then(() => {
   console.log("----------------------")
   console.log("connection established")
   console.log("----------------------")
})
genresSchema = new mongoose.Schema({
   name: { type: String, required: true },
   isDeleted: { type: Boolean, default: false }
})
let Genre = mongoose.model("Genre", genresSchema, "genres")
// create genres

// read genres
router.get("/", async (req, res) => {
   let genres = await Genre.find({})
   .catch(() => {
      res.status(400).send("error occured")
   })
   res.send(genres)
})
// read genre
router.get("/:id", async (req, res) => {
   let genreId = req.params.id
   let genre = await Genre.findById(genreId)
   .catch(() => {
      res.status(403).send("couldn't find genre")
   })
   res.send(genre)
})
// create genre
router.post("/", async (req, res) => {
   let newGenre = await new Genre()
   newGenre.name = req.body.name
   newGenre = await newGenre.save()
   res.send(newGenre)
})
// update genre
router.put("/:id", async (req, res) => {
      const updated = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name })
      .catch(() => res.status(400).send("error updating"))
      res.send(updated)
})
//delete genre (carefull cause req.params.id is str not id)
router.delete("/:id", async (req, res) => {
      const deleted = await Genre.findByIdAndDelete(req.params.id)
      .catch(() => res.status(400).send("error 400, couldnt delete"))
      res.send(deleted)
})

module.exports = router
