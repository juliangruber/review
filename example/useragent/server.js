var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.end(req.headers['user-agent']);
})

app.listen(8777)
console.log('-> http://localhost:8777')
