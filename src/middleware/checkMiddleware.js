const jwt = require('jsonwebtoken')

require('dotenv').config()

const verifyToken = (req, res, next) => {
  let accessToken = req.headers.authorization?.split(" ")[1]
  if (!accessToken) {
    return res.status(400).json({
      error: 1,
      msg: 'Missing accesstoken'
    })
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKKEN_SECRET, (err, user) => {
    if (err)
      return res.status(200).json({
        err: 1,
        msg: "Missing accesstoken expired"
      })
    req.user = user;
    next()
  })
}

module.exports = verifyToken