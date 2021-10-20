const { Users, Posts } = require("../models");

exports.createPost = async (req, res) => {
  const post = req.body;
  const user = await Users.findOne({ where: { email: req.params.email } });

  post.user_id = user.id;

  await Posts.create(post).catch((err) => res.json(err));
  res.json(post);
};

exports.getAllPosts = async (req, res) => {
  const posts = await Posts.findAll({ include: Users }).catch((err) =>
    res.status(500).json(err)
  );
  res.status(200).json(posts);
};

exports.getPostById = async (req, res) => {
  const post = await Posts.findOne({
    where: { id: req.params.id },
    include: Comments,
  }).catch((e) => res.json(e));
  if (!post) {
    res.json(`Cannot find post with id: ${req.params.id}`);
  }
  res.json(post);
};

exports.updatePost = async (req, res) => {
  const post = await Posts.findOne({ where: { id: req.params.id } });

  if (!post) {
    res.json(`Id: ${req.params.id} does not exist.`);
  }
  const updatedPost = await Posts.update(req.body, {
    where: { id: req.params.id },
  })
    .then((result) => res.json(result))
    .catch((e) => res.status(400).json(e));
};

exports.deletePost = async (req, res) => {
  const post = await Posts.findOne({ where: { id: req.params.id } }).catch(
    (e) => {
      res.json(e);
    }
  );

  if (!post) {
    res.json("System cannot find by your shift");
  }

  post.destroy();
  res.json(`Delete post ${req.params.id}`);
};
