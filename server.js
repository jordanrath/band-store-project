const express = require('express')
const app = express()

app.set('view engine', 'ejs') //makes front end use ejs to render it's views\
app.use(express.static('Public'))

app.listen(3000)