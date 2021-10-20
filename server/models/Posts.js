module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      foreignKey: "post_id",
      onDelete: "CASCADE",
    });
    Posts.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });

    Posts.belongsToMany(models.Users, {
      through: "Likes",
      foreignKey: "post_id",
      as: "usersLike",
    });

    Posts.belongsToMany(models.Users, {
      through: "DisLikes",
      foreignKey: "post_id",
      as: "usersDisLike",
    });
  };
  return Posts;
};
