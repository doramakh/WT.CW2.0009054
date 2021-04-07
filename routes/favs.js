const path = require('path')
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, "../", "data", "posts.json")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)

module.exports = {
    FAVID:  async (req, res) => {
        try {
            const content = await read(filePath, "utf8")
            const data = JSON.parse(content)  
            const id = req.params.id
            const postIndex = data.findIndex(post => post.id === id)
            
            data[postIndex].fav = true

            write(filePath, JSON.stringify(data))

            res.redirect('/posts/'+id+'?success=1')
        } catch (error) {
            res.redirect('/posts/'+id+'?success=0')
        }
    },
    GET: async (req, res) => {
        const content = await read(filePath, "utf8")
        const data = JSON.parse(content)  
        const favPosts = data.filter(post => post.fav === true)
        res.render('favs', {data: favPosts})
    },
    FAVDELETE: async (req, res) => {
        try {
            const content = await read(filePath, "utf8")
            const data = JSON.parse(content)  
            const id = req.params.id
            const postIndex = data.findIndex(post => post.id === id)
            
            data[postIndex].fav = false

            write(filePath, JSON.stringify(data))

            res.redirect('/favs')
        } catch (error) {
            res.redirect('/posts/'+id+'?success=0')
        }
    }
}