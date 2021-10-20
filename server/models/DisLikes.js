module.exports = (sequelize, DataTypes) => {
  const DisLikes = sequelize.define("DisLikes", {});

  DisLikes.associate = function (models) {};

  return DisLikes;
};
