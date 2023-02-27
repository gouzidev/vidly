const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
// let genres = [
//     {
//        id: 1,
//        name: "action"
//     },
//     {
//        id: 2,
//        name: "drama"
//     },
//     {
//        id: 3,
//        name: "comedy"
//     },
//     {
//        id: 4,
//        name: "romance"
//     }
//  ]

// read genres

// read genre by ID

class Genre {
   constructor(name) {
      this.name = name
      this.Genres = null
      this.genresSchema = null
      this.connected = false
   }
   async config() {
      mongoose
         .connect("mongodb://localhost/mern")
         .then( async () => {
            console.log("connection established")
            this.connected = true
         })
         .then( async () => {
            if (this.connected) {
               this.genresSchema = new mongoose.Schema({
                  name: { type: String, required: true }
               })
            }
         })
         .then( async () => {
             this.Genres = await mongoose.model("Genres", this.genresSchema, "genres")
         })
         .catch((err) => console.log(err))
     
   }
   async createGenre() {
       this.config().then( () => {
         if (this.connected) {
            const genre = new this.Genres()
            genre.name = this.name
            genre.save()
            console.log("added")
         }
      } ) 
   }
}
let newCourse = new Genre("isekai")
// console.log(Genres);
 newCourse.createGenre().then(() => console.log(newCourse))











// read genres
router.get("/", (req, res) => {
   res.send(genres)
})
// read genre
router.get("/:id", (req, res) => {
   let genreId = req.params.id
   let genre = genres.find((genre) => genre.id == genreId)
   // if it exists already => error 400 = bad request
   if (!genre) return res.status(404).send("genre not found")
   return res.send(genre)
})
// create genre
router.post("/", async (req, res) => {
   let genre = new Genres()
   genre.name = await req.query.name
   genre.save()
   res.send(`added new genre => { name : ${genre.name} }`)
   console.log(genre)
})
// update genre
router.put("/:id", (req, res) => {
   let genre = genres.find((genre) => genre.id == req.params.id)
   if (genre) {
      genre.name = req.query.name
   }
   res.send(genre)
})
//delete genre (carefull cause req.params.id is str not id)
router.delete("/:id", (req, res) => {
   let genre = genres.find((genre) => genre.id == req.params.id)
   if (genre) {
      genres = genres.filter((genre) => genre.id !== parseInt(req.params.id))
      return res.send(genres)
   }
   return res.status(404).send("genre not found")
})

module.exports = router
