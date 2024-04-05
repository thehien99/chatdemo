'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messengers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      conversationId: {
        type: Sequelize.STRING,
      },
      senderId: {
        type: Sequelize.STRING
      },
      receiverId: {
        type: Sequelize.STRING
      },
      messageText: {
        type: Sequelize.TEXT,
      },
      sentDatetime: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Messengers');
  }
};