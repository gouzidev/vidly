const express = require("express")
const debugModule = require("debug")
const debug = debugModule("app:startup")
const router = require("./routes/genres.js")

require("dotenv").config()
const app = express()
app.use(express.json())
app.use("/genres", router)
debug("hello from debugger")

let port = process.env.PORT || 8888
app.listen( port , () => console.log(`server running on port ${port}`))
