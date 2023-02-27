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

mongoose.connect("mongodb://localhost/mern").then(() => {
   console.log("----------------------")
   console.log("connection established")
   console.log("----------------------")
})
genresSchema = new mongoose.Schema({
   name: { type: String, required: true }
})
let Genre = mongoose.model("Genre", genresSchema, "genres")



// create genres
const createGenre = async (name) => {
   const genre = new Genre()
   await Genre.findOne({ name: name })
      .then((res) => {
         if (res) {
            console.log("\nalready exists !\n")
         } else {
            genre.name = name
            genre.save()
            console.log("added")
         }
      })
      .catch((err) => {
         console.log(err)
      })
}

// read genres
async function readGenres () {
   let genres = await Genre.find({})
   for (let genre of genres) {
      console.log(genre);
   }
}
// read genre
async function readGenre ( filter ) {
   let genre = await Genre.findOne(filter)
      console.log(genre);
}
// update genres
async function updateGenre ( filter , payload ) {
   let updated = await Genre.updateMany(filter , payload)
      console.log(updated);
}
// delete genres
async function deleteCourse( filter ) {
   let deleted = await Genre.deleteMany(filter)
      console.log(deleted)
}






















async function removeDuplicates() {
   let obj = {}
   let genres = await Genre.find({})
   genres.forEach((genre) => {
      // if we found one genre with that name
      obj[genre.name] !== undefined ?
      // we want to remove it.
         ( async () => {
            console.log(await Genre.deleteOne({_id :genre.id }));
            obj[genre.name]++ 
         })()
       // else , we good, 
      :
         obj[genre.name] = 0 
   })
}

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
   try {
      if (req.query.name) {
         createGenre(req.query.name).then(() => {
            res.send(`added new genre => { name : ${req.query.name} }`)
         })
      }
   } catch (err) {
      console.log(err)
   }
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
