const { v4 } = require("uuid")
const path = require("path")
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, "../", "data", "posts.json")
const imagePath = path.join(__dirname, "../","/public", "/images")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

module.exports = {
    GET: (req, res) => res.render("create-post"),
    POST: async(req, res) =>{
        const { title, text } = req.body
        const { fileImage } = req.files

        const content = await read(filePath, "utf8")
        const data = JSON.parse(content)
        
        const image = fileImage
        const name = v4() + "." + image.mimetype.split("/")[1]

        image.mv(path.join(imagePath, name), (error) => {
            if (error) {
                console.error(error)
            }
        })

        const newPost = {
            id: v4(),
            title: title,
            text: text,
            image: name
        }

        data.push(newPost)
        write(filePath, JSON.stringify(data))

        res.redirect("api/v1/posts")
    }
}