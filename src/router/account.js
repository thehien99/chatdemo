const express = require('express')
const accountController = require('../controller/accountController')
let router = express.Router()
let accountRouter = (app) => {
  router.post('/api/register', accountController.register)
  router.post('/api/login', accountController.login)

  return app.use('/', router)
}
module.exports = {
  accountRouter: accountRouter
}