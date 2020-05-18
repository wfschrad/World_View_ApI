'use strict';
module.exports = (sequelize, DataTypes) => {
  const NewsStory = sequelize.define('NewsStory', {
    url: DataTypes.STRING,
    urlImg: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.TEXT,
    upVoteCount: DataTypes.INTEGER,
    downVoteCount: DataTypes.INTEGER
  }, {});
  NewsStory.associate = function (models) {
    // associations can be defined here
    NewsStory.hasMany(models.SavedStory, { foreignKey: 'storyId' });
  };
  return NewsStory;
};