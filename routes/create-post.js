const { v4 } = require("uuid")
const path = require("path")
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, "../", "data", "posts.txt")
const imagePath = path.join(__dirname, "../","/public", "/images")

const read = util.promisify(fs.readFile)
const write = util.promisify(fs.writeFile)


const createData = async ({ title, text }, { fileImage }) => {
    const content = await read(filePath, "utf8")
    const data = JSON.parse(content)

    const image = fileImage
	const name = v4() + "." + image.mimetype.split("/")[1]

	image.mv(path.join(imagePath, name), (error) => {
		if (error) {
			console.error(error)
		}
	})

	const newItem = {
		id: v4(),
		title: title,
		text: text,
		image: name,
		views: 0
	}

	data.push(newItem)
    write(filePath, JSON.stringify(data))
	return("/")
}

module.exports = {
    GET: (req, res) => res.render("create-post"),
    POST: async(req, res) => res.redirect(createData(req.body, req.files))
}