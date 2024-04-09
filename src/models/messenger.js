'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messenger extends Model {

    static associate(models) {
      Messenger.belongsTo(models.Account, { foreignKey: 'senderId', targetKey: 'id', as: 'Accounts' })
      Messenger.belongsTo(models.Conversation, { foreignKey: 'conversationId', targetKey: 'id', as: 'Conversations' })
    }
  }
  Messenger.init({
    conversationId: DataTypes.STRING,
    senderId: DataTypes.ARRAY(DataTypes.STRING),
    messageText: DataTypes.ARRAY(DataTypes.TEXT),
    sentDatetime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
    {
      sequelize,
      modelName: 'Messenger',
    });
  return Messenger;
};