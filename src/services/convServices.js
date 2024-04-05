const { where } = require("sequelize")
const db = require("../models")
const { v4 } = require('uuid')

const newConversation = ({ senderId, receiverId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newConversation = await db.Conversation.findOrCreate({
        where: {
          senderId: senderId,
          receiverId: receiverId
        },
        defaults: {
          id: v4(),
        }
      })
      resolve({
        msg: 'Conversation create successfully',
        newConversation
      })
    } catch (error) {
      reject(error)
    }
  })
}


const getUserId = (userId) => {
  console.log(userId)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Conversation.findAll({
        where: {
          senderId: userId,
        },
        raw: true,
        nest: true,
        attributes: ["id", "senderId", "receiverId"]
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}

const newMessages = ({ conversationId, senderId, messageText, receiverId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newMess = await db.Messenger.create({
        id: v4(),
        conversationId,
        senderId,
        receiverId,
        messageText: JSON.parse(messageText)
      })
      resolve(newMess)
    } catch (error) {
      reject(error)
    }
  })
}

const MessId = (conversationId) => {
  console.log(conversationId)
  return new Promise(async (resolve, reject) => {
    try {
      const getMess = await db.Messenger.findAll({
        where: { conversationId },
        raw: true
      })
      resolve(getMess)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  newConversation: newConversation,
  getUserId: getUserId,
  newMessages: newMessages,
  MessId: MessId
}