const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDb } = require('./src/config/connectDB');
const { accountRouter } = require('./src/router/account')
require('dotenv').config();
let app = express()

app.use(cors({
  origin: true,
  methods: ["POST", 'GET', 'PUT', "DELETE"]
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

accountRouter(app)
connectDb()
const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log('Server run port', port)
})