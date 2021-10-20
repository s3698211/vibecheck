module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      foreignKey: "user_id",

      onDelete: "CASCADE",
    });

    Users.hasMany(models.Comments, {
      foreignKey: "user_id",

      onDelete: "CASCADE",
    });

    Users.belongsToMany(models.Posts, {
      through: "Likes",
      foreignKey: "user_id",
      as: "likedPosts",
    });

    Users.belongsToMany(models.Posts, {
      through: "DisLikes",
      foreignKey: "user_id",
      as: "dislikedPosts",
    });
  };

  Users.belongsToMany(Users, {
    as: "following",
    foreignKey: "user_id",
    through: "Followings",
  });

  return Users;
};
