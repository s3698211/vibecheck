const { Users, Followings } = require("../models");

/*
Funcion: Follow
Feature: Let "Main" follows "Target"
Description:
    - Check if "Main" followed "Target" or not.
        + If Yes: return "UnFollow"
        + If No: return "Following"
    - Return error if there is any errors.

*/
exports.follow = async (req, res) => {
  const { main, target } = req.body;
  let alreadyFollowed = false;
  let destroyTarget = 0;
  const mainUser = await Users.findOne({
    where: { email: main },
    include: [
      {
        model: Users,
        as: "following",
        through: {
          attributes: [], //Exclude the "Followings" join table in user object
        },
      },
    ],
  });

  //Check whether "main" followed "target" or not.
  for (let i = 0; i < mainUser.following.length; i++) {
    if (mainUser.following[i].email === target) {
      alreadyFollowed = true;
      destroyTarget = mainUser.following[i].id;
      break;
    }
  }

  if (alreadyFollowed) {
    const follow = await Followings.findOne({
      where: { user_id: mainUser.id, followingId: destroyTarget },
    });
    await follow.destroy();

    res.status(200).json("Unfollow");
  } else {
    //If not, "main" can follow "target"

    const targetUser = await Users.findOne({ where: { email: target } });

    const followings = { user_id: mainUser.id, followingId: targetUser.id };

    await Followings.create(followings)
      .then(() => {
        res.status(200).json("Followed");
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
};

//Find people who users is following
exports.getFollowings = async (req, res) => {
  const userEmail = req.params.email;

  const user = await Users.findOne({
    where: { email: userEmail },
    include: [
      {
        model: Users,
        as: "following",
        through: {
          attributes: [], //Exclude the "Followings" join table in user object
        },
      },
    ],
  });

  res.status(200).json(user.following);
};

exports.checkFollowStatus = async (req, res) => {
  const { main, target } = req.body;
  let following = false;
  const mainUser = await Users.findOne({
    where: { email: main },
    include: [
      {
        model: Users,
        as: "following",
        through: {
          attributes: [], //Exclude the "Followings" join table in user object
        },
      },
    ],
  });

  //Check whether "main" followed "target" or not.
  for (let i = 0; i < mainUser.following.length; i++) {
    if (mainUser.following[i].email === target) {
      following = true;
      break;
    }
  }
  if (following) {
    res.json("Following");
  } else {
    res.json("Not Following");
  }
};
