const express = require('express')
const verifyToken = require('../middleware/checkMiddleware')
const convController = require('../controller/convController')
let router = express.Router()
let convRouter = (app) => {
  //create conversation
  router.post('/api/conversation', convController.convMessenger)

  //get conversation of id
  router.get('/api/conversations', convController.getUserIdConv)


  // create message
  router.post('/api/message', convController.newMessage)

  //get more conversations of id
  router.get('/api/message/getConvId', convController.getMessId)

  router.get('/api/message/getMess', convController.getMessOfUser)
  return app.use('/', router)
}
module.exports = {
  convRouter: convRouter
}