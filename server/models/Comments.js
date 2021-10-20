module.exports = (sequelize, DataType) => {
  const Comments = sequelize.define("Comments", {
    body: {
      type: DataType.STRING,
      allowNull: false,
    },
  });

  Comments.associate = (models) => {
    Comments.belongsTo(models.Users, {
      foreignKey: "user_id",
      onDelete: "CASCADE",
    });
  };
  return Comments;
};
