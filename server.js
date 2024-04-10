
const express = require('express')
const socketIo = require("socket.io")
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDb } = require('./src/config/connectDB');
const { accountRouter } = require('./src/router/account');
const { convRouter } = require('./src/router/conv');

require('dotenv').config();
let app = express()
let server = require('http').Server(app);
let io = require('socket.io')(server);
app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

accountRouter(app)
convRouter(app)

connectDb()
const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log('Server run port', port)
})
