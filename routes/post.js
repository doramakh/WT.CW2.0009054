const path = require('path')
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, "../", "data", "posts.json")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

module.exports = {
    GET: async (req, res) => {
        try {
            const content = await read(filePath, "utf8")
            const data = JSON.parse(content)
            const { id } = req.params
            const findPost = id => data.find(post => post.id === id)
            res.render("post", {
                item: findPost(id)
            })
        } catch (error) {
            res.redirect('/')
        }
    },
    DELETE: async (req, res) => {
        try {
            const content = await read(filePath, "utf8")
            const data = JSON.parse(content)  
            const id = req.params.id
            const postIndex = data.findIndex(post => post.id === id)
            
            data.splice(postIndex, 1)
            
            write(filePath, JSON.stringify(data))

            res.redirect('/api/v1/posts')
        } catch (error) {
            console.log(error)
            res.redirect('/')
        }
    }
}


