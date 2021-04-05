const express = require('express')
const app = express()

app.get("/", (_, res) => {
    res.send("OK")
}) 

app.listen(3000, console.log('App is running on localhost: 3000'))