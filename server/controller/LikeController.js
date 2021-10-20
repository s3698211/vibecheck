const { Users, Posts, Likes, DisLikes } = require("../models");

exports.likePost = async (req, res) => {
  const userEmail = req.body.email;
  const postId = req.params.id;

  const user = await Users.findOne({
    where: { email: userEmail },
    include: [
      {
        model: Posts,
        as: "likedPosts",
        through: {
          attributes: [], //Exclude the "through" join table in user object
        },
      },
    ],
  });

  const post = await Posts.findOne({
    where: { id: postId },
    include: [
      {
        model: Users,
        as: "usersDisLike",
        through: {
          attributes: [], //Exclude the "through" join table in user object
        },
      },
    ],
  });
  //Check if user already "disliked" the post or not. If yes, remove "disliked"
  checkUserDisLikeStatus(post, user.id, res);
  /*
  Check if the user is already liked or not. 
  If "yes", remove "like", else create "like"
  */
  hanldeUserLikeStatus(user, postId, res);
};

exports.getLikes = async (req, res) => {
  const postId = req.params.id;
  const post = await Posts.findOne({
    where: {
      id: postId,
    },
    include: [
      {
        model: Users,
        as: "usersLike",
        through: {
          attributes: [], //Exclude the "through" join table in user object
        },
      },
    ],
  }).catch((err) => res.status(500).json(err));

  res.status(200).json(post.usersLike);
};

//Helper Method

const hanldeUserLikeStatus = async (user, postId, res) => {
  let liked = false;

  for (let i = 0; i < user.likedPosts.length; i++) {
    if (user.likedPosts[i].id == postId) {
      liked = true;
      break;
    }
  }

  if (liked) {
    const like = await Likes.findOne({
      where: { user_id: user.id, post_id: postId },
    });
    await like.destroy();
    res.status(200).json("Remove Like");
  } else {
    const like = await Likes.create({
      user_id: user.id,
      post_id: postId,
    }).catch((err) => res.status(500).json(err));

    res.status(200).json("Liked");
  }
};

exports.checkUserLikeStatus = async (req, res) => {
  const postId = req.params.id;
  const userEmail = req.body.userEmail;

  const post = await Posts.findOne({
    where: { id: postId },
    include: [
      {
        model: Users,
        as: "usersLike",
        through: {
          attributes: [], //Exclude the "through" join table in user object
        },
      },
    ],
  });

  for (let i = 0; i < post.usersLike.length; i++) {
    if (post.usersLike[i].email === userEmail) {
      res.json("Liked");
      break;
    }
  }

  res.json("Not Like Yet");
};

const checkUserDisLikeStatus = async (post, userId, res) => {
  let alreadyDisLiked = false;
  for (let i = 0; i < post.usersDisLike.length; i++) {
    if (post.usersDisLike[i].id == userId) {
      alreadyDisLiked = true;
      break;
    }
  }

  if (alreadyDisLiked) {
    const disLike = await DisLikes.findOne({
      where: { user_id: userId, post_id: post.id },
    });
    await disLike.destroy();
  }
};
