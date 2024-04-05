const convServices = require("../services/convServices")

const convMessenger = async (req, res) => {
  const { senderId, receiverId } = req.body
  try {
    const response = await convServices.newConversation(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}

const getUserIdConv = async (req, res) => {
  const senderId = req.query.senderId
  try {
    const response = await convServices.getUserId(senderId)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}

const newMessage = async (req, res) => {
  const { conversationId, senderId, messageText, receiverId } = req.body
  try {
    const response = await convServices.newMessages(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}


const getMessId = async (req, res) => {
  const { conversationId } = req.query
  try {
    const response = await convServices.MessId(conversationId)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}
module.exports = {
  convMessenger: convMessenger,
  getUserIdConv: getUserIdConv,
  newMessage: newMessage,
  getMessId: getMessId
}