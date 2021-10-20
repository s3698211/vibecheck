const { Users, Posts, Likes, DisLikes } = require("../models");

exports.disLikedPost = async (req, res) => {
  const userEmail = req.body.email;
  const postId = req.params.id;

  const user = await Users.findOne({
    where: { email: userEmail },
    include: [
      {
        model: Posts,
        as: "dislikedPosts",
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
        as: "usersLike",
        through: {
          attributes: [], //Exclude the "through" join table in user object
        },
      },
    ],
  });

  //Check if the user already like the post or not. If yes, delete the like.
  checkUserLikeStatus(post, user.id, res);
  /*
    Check if the user already disliked the post or not.
    If "yes", remove "disliked", else create "disliked"
*/
  hanldeUserDisLikeStatus(user, postId, res);
};

exports.getDisLiked = async (req, res) => {
  const postId = req.params.id;
  const post = await Posts.findOne({
    where: {
      id: postId,
    },
    include: [
      {
        model: Users,
        as: "usersDisLike",
        through: {
          attributes: [], //Exclude the "through" join table in user object
        },
      },
    ],
  }).catch((err) => res.status(500).json(err));

  res.status(200).json(post.usersDisLike);
};

const hanldeUserDisLikeStatus = async (user, postId, res) => {
  let disLiked = false;

  for (let i = 0; i < user.dislikedPosts.length; i++) {
    if (user.dislikedPosts[i].id == postId) {
      disLiked = true;
      break;
    }
  }

  if (disLiked) {
    const disLike = await DisLikes.findOne({
      where: { user_id: user.id, post_id: postId },
    });
    await disLike.destroy();
    res.status(200).json("Remove dis-liked");
  } else {
    const disLike = await DisLikes.create({
      user_id: user.id,
      post_id: postId,
    }).catch((err) => res.status(500).json(err));

    res.status(200).json("DisLiked");
  }
};

exports.checkUserDisLikeStatus = async (req, res) => {
  const postId = req.params.id;
  const userEmail = req.body.userEmail;
  let disLikeStatus = false;

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

  for (let i = 0; i < post.usersDisLike.length; i++) {
    if (post.usersDisLike[i].email === userEmail) {
      disLikeStatus = true;
      break;
    }
  }
  if (disLikeStatus) {
    res.json("Dis-liked");
  } else {
    res.json("Not dis-like yet.");
  }
};

//Helper method
const checkUserLikeStatus = async (post, userId, res) => {
  let alreadyLikedPost = false;
  for (let i = 0; i < post.usersLike.length; i++) {
    if (post.usersLike[i].id == userId) {
      alreadyLikedPost = true;
      break;
    }
  }

  if (alreadyLikedPost) {
    const like = await Likes.findOne({
      where: { user_id: userId, post_id: post.id },
    });
    await like.destroy();
  }
};
