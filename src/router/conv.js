const express = require('express')
const verifyToken = require('../middleware/checkMiddleware')
const convController = require('../controller/convController')
let router = express.Router()
let convRouter = (app) => {
  router.post('/api/conversation', convController.convMessenger)
  router.get('/api/conversations', convController.getUserIdConv)

  router.post('/api/message', convController.newMessage)
  router.get('/api/getConvId', convController.getMessId)
  return app.use('/', router)
}
module.exports = {
  convRouter: convRouter
}