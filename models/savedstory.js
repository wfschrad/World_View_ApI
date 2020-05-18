'use strict';
module.exports = (sequelize, DataTypes) => {
  const SavedStory = sequelize.define('SavedStory', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER
  }, {});
  SavedStory.associate = function (models) {
    // associations can be defined here
    SavedStory.belongsTo(models.User, { foreignKey: 'userId' });
    SavedStory.belongsTo(models.NewsStory, { foreignKey: 'storyId' });

  };
  return SavedStory;
};