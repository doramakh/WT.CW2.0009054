const path = require('path')
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, "../", "data", "posts.txt")

const read = util.promisify(fs.readFile)

module.exports = {
    GET:    async (req, res) =>{ 
        const content = await read(filePath, "utf8")
        const data = JSON.parse(content)  
        res.render("posts", {data: data})
    }
}
// console.log(data)