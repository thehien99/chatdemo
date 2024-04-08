const express = require('express')
const accountController = require('../controller/accountController')
let router = express.Router()
let accountRouter = (app) => {
  router.post('/api/register', accountController.register)
  router.post('/api/login', accountController.login)

  // get userId
  router.get('/api/getUserId', accountController.getUserId)


  return app.use('/', router)
}
module.exports = {
  accountRouter: accountRouter
}