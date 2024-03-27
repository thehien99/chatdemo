const accountServices = require("../services/accountServices")

const register = async (req, res) => {
  const { name, password, avatar } = req.body
  try {
    if (!name, !password) {
      return res.status(400).json({
        error: 0,
        msg: 'Missing Input !!!!'
      })
    }
    const response = await accountServices.register(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log(`Failed ${error}`)
  }
}

const login = async (req, res) => {
  const { name, password } = req.body
  try {
    if (!name, !password) {
      return res.status(400).json({
        error: 0,
        msg: 'Missing Input !!!'
      })
    }
    const response = await accountServices.login(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log('Login Failed', error)
  }
}
module.exports = {
  register: register,
  login: login
}