const express = require('express')
const app = express()

app.use(express.static("public"))
app.set("view engine", "ejs")

const PORT = process.env.PORT || 3000

app.get("/", (_, res) => {
    res.render("index")
}) 

app.listen(PORT, () => {
    console.log("Server ready at local host:" + PORT)
})