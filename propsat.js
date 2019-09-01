// roda o satsolver
const sat = require ('./sat.js')

const express = require('express')
const app = express()
 
console.log("app listenning on port 5000")
app.get('/', function (req, res) {
  res.send(sat.solve('./testcases/simple2.cnf'))

})
 
app.listen(5000)