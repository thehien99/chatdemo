'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {

    static associate(models) {
      Conversation.hasMany(models.Messenger, { foreignKey: 'conversationId', as: 'Conversations' })
    }
  }
  Conversation.init({
    members: DataTypes.ARRAY(DataTypes.STRING)
  },
    {
      sequelize,
      modelName: 'Conversation',
    });
  return Conversation;
};