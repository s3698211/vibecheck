const { Comments, Users } = require("../models");
exports.addComment = async (req, res) => {
  const comment = req.body;
  const user = await Users.findOne({ where: { id: req.user.id } });

  comment.user_id = user.id;

  comment.post_id = req.params.postId;
  await Comments.create(comment).catch((err) =>
    res.json({ postID: req.params.postId, error: err })
  );
  res.status(200).json(comment);
};

exports.getAllComments = async (res) => {
  const comments = await Comments.findAll({ include: Users });

  res.status(200).json(comments);
};

exports.getCommentByPostId = async (req, res) => {
  const comments = await Comments.findAll({
    where: { post_id: req.params.postId },
    include: Users,
  }).catch((err) => res.status(400).json(err));

  if (!comments) {
    res.status(404).json(`Cannot find post with id:${req.params.postId}`);
  }
  res.json(comments);
};
