
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { connectDb } = require('./src/config/connectDB');
const { accountRouter } = require('./src/router/account');
const { convRouter } = require('./src/router/conv');
const http = require("http");

require('dotenv').config();
let app = express()
const server = http.createServer(app);
//socketio
const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  }
})
socketIo.on("connection", (socket) => {
  console.log("New client connected" + socket.id);

  socket.on('sendMessage', function (data) {
    console.log(data);
    socketIo.emit('recieveMessage', { data })
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })
})



app.use(cors({ origin: true }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

accountRouter(app)
convRouter(app)

connectDb()


const port = process.env.PORT || 6969
server.listen(port, () => {
  console.log('Server run port', port)
})
