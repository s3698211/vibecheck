module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {});

  Likes.associate = function (models) {};

  return Likes;
};
