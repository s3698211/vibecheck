module.exports = (sequelize, DataTypes) => {
  const Followings = sequelize.define("Followings", {});

  Followings.associate = function (models) {};

  return Followings;
};
