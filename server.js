const express = require("express")
const connectDB = require("./data/data")
require("dotenv").config()
const URL = process.env.URL
const PORT =process.env.PORT
const app = express()

app.use(express.json());
app.use("/school",require("./routes/routes"))

const start = async ()=>{
    await connectDB(URL)
    app.listen(PORT,()=>{console.log(`The server is running on ${PORT} port`)})
}

start()