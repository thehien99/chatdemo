const bcrypt = require('bcryptjs')
const db = require('../models/index')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
const account = require('../models/account')
const { Op, where } = require('sequelize')

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
        attributes:
        {
          include: ['id', 'name', 'password'],
        }
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
        token: token || null,
        response: { id: response.id, name: response.name }
      })
    } catch (error) {
      reject({
        status: 0,
        msg: `Login failed ${error}`
      })
    }
  })
}


//get userId
const getUserIds = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ['password']
        }
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

// addfriend
const addFrServices = ({ friendId, id }) => {
  console.log({ friendId, id })
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findAll({
        where: { id },
        attributes: ['follower']
      })
      const loop = response.map((item) => {
        return item.follower
      })

      loop.forEach(async element => {
        const trueOrFalse = element.includes(friendId)
        if (trueOrFalse === true) {
          resolve({
            msg: 'Bạn đã có bạn bè với người này rồi'
          })
        } else {
          await db.Account.update(
            { follower: db.Sequelize.fn('array_append', db.Sequelize.col('follower'), friendId) }, { where: { id } },
          )
          await db.Account.update(
            { following: db.Sequelize.fn('array_append', db.Sequelize.col('following'), id) }, { where: { id: friendId } }
          )
          resolve({
            msg: 'AddFriend Success'
          })
        }
      });
    } catch (error) {
      reject(error)
    }
  })
}


//search for name
const searchNameService = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findAll({
        where: { name },
        raw: true
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const getFollow = (id) => {
  console.log('services', id);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Account.findOne({
        where: { id },
        raw: true,
        attributes: {
          exclude: ['password', 'following', 'follower']
        }
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}


module.exports = {
  register: register,
  login: login,
  getUserIds: getUserIds,
  addFrServices: addFrServices,
  searchNameService: searchNameService,
  getFollow: getFollow
}