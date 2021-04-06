const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

const fileUpload = require("express-fileupload")

const Home = require("./routes/home")
const Posts = require("./routes/posts")
const Post = require("./routes/post")
const CreatePost = require("./routes/create-post")

app.use(express.json())
app.use(fileUpload())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", Home.GET)
app.get("/post/:id", Post.GET)
app.get("/posts", Posts.GET)
app.get("/create-post", CreatePost.GET)
app.post("/create-post", CreatePost.POST)

app.listen(PORT, () => {
    console.log("Server ready at local host:" + PORT)
})