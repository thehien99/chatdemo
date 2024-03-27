const bcrypt = require('bcryptjs')
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')

require('dotenv').config()

const hashpassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

const register = ({ name, password, avatar }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOrCreate({
        where: { name: name },
        raw: false,
        defaults: {
          password: hashpassword(password),
          id: v4(),
          avatar: avatar
        }
      });
      const token = response && jwt.sign(
        { id: response.id, name: response.name },
        process.env.ACCESS_TOKKEN_SECRET,
        { expiresIn: '1d' }
      );
      resolve({
        status: 1,
        token: token
      })
    } catch (error) {
      reject({
        status: 0,
        msg: error
      })
    }
  })
}

const login = ({ name, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOne({
        where: { name },
        raw: true
      })
      const passwordHash = response && bcrypt.compareSync(password, response.password)
      const token = passwordHash && jwt.sign(
        { id: response.id, name: response.name },
        process.env.ACCESS_TOKKEN_SECRET,
        { expiresIn: '1d' }
      )
      resolve({
        status: token ? 1 : 2,
        msg: token ? 'Login success' : response ? "Password is Wrong !! " : "Name not found !!",
        token: token || null
      })
    } catch (error) {
      register({
        status: 0,
        msg: `Login failed ${error}`
      })
    }
  })
}
module.exports = {
  register: register,
  login: login
}