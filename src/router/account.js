const express = require('express')
const accountController = require('../controller/accountController')
let router = express.Router()
let accountRouter = (app) => {
  router.post('/api/register', accountController.register)
  router.post('/api/login', accountController.login)

  // get userId
  router.get('/api/getUserId', accountController.getUserId)

  //addfriend
  router.put('/api/addfr', accountController.addFr)

  //searchforname
  router.get('/api/search', accountController.searchName)


  //get following and follower

  return app.use('/', router)
}
module.exports = {
  accountRouter: accountRouter
}