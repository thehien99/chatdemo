const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDb } = require('./config/connectDB');
const accountRouter = require('./router/account')
require('dotenv').config();
let app = express()

app.use(cors({ origin: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

accountRouter(app)
connectDb()
const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log('Server run port', port)
})