const bcrypt = require('bcryptjs')
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const account = require('../models/account')

require('dotenv').config()

const hashpassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

const register = ({ password, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOrCreate({
        where: { name },
        defaults: {
          name,
          password: hashpassword(password),
          id: v4()
        },
      });
      const token =
        response[1] &&
        jwt.sign(
          { id: response[0].id, name: response[0].name },
          process.env.ACCESS_TOKKEN_SECRET,
          { expiresIn: "1d" }
        );
      resolve({
        err: token ? 1 : 2,
        msg: token
          ? "Register is successfully !"
          : "Name has been aldready used !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });


const login = ({ name, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOne({
        where: { name },
        raw: true,
        attributes: ['id', 'name', 'password']
      })
      console.log(response);
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
      reject({
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