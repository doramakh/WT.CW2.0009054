const path = require('path')
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, "../", "data", "posts.json")

const read = util.promisify(fs.readFile)

module.exports = {
    GET: 
    async (req, res) => { 
        try {
            const content = await read(filePath, "utf8")
            const data = JSON.parse(content)  
            res.render("posts", {data: data})
        }
        catch (error) {
            res.redirect('/')
        }
        
    } 
}
// console.log(data)