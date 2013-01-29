var express = require('express')
var app = express()

app.use(express.cookieParser())

app.get('/', function (req, res) {
  res.json(req.cookies)
})

app.listen(8777)