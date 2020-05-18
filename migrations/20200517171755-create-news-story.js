'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('NewsStories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      url: {
        allowNull: false,
        type: Sequelize.TEXT,
        unique: true
      },
      urlImg: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      title: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      content: {
        type: Sequelize.TEXT
      },
      upVoteCount: {
        type: Sequelize.INTEGER
      },
      downVoteCount: {
        type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('NewsStories');
  }
};