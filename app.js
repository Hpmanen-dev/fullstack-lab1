const express = require("express")
const dotenv = require("dotenv")
const app = express()
const PORT = process.env.PORT || 3000
dotenv.config()
const mongoose = require("mongoose")

mongoose.connect(process.env.DB_Connection, {useNewUrlParser: true})
.then(() => {
    console.log("Connected to the database!");

    app.use(express.json());
    app.use(express.static("public"))


    const api = require('./routes/api');
    app.use("/api", api)


    app.listen(PORT, () => {
        console.log("Listening on port: " + PORT)
    })
})