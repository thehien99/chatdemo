const db = require("../models")
const { v4 } = require('uuid')
const { Op } = require('sequelize');


//create conversation
const newConversation = ({ senderId, receiverId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newConversation = await db.Conversation.findOrCreate({
        where: {
          members: [senderId, receiverId]
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

//get conversation for userId
const getUserId = (userId) => {
  console.log(userId)
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Conversation.findAll({
        where: {
          members: { [Op.contains]: [userId] },
        },
        raw: true,
        nest: true,
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}


//create mess private
const newMessages = ({ conversationId, senderId, messageText, id }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Messenger.findOrCreate({
        where: { conversationId },
        defaults: {
          id: v4(),
          conversationId: conversationId,
        }
      })
      await db.Messenger.update({
        senderId: db.Sequelize.fn('array_append', db.Sequelize.col('senderId'), senderId)
      }, { where: { conversationId } })
      await db.Messenger.update({
        messageText: db.Sequelize.fn('array_append', db.Sequelize.col('messageText'), JSON.parse(messageText))
      }, { where: { conversationId } })
      resolve({
        err: 1,
        msg: 'Success'
      })
    } catch (error) {
      reject(error)
    }
  })
}


//get message of user private
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
  MessId: MessId,
}