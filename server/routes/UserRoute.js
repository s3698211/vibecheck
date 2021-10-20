const express = require("express");
const router = express.Router();
const { Users, Posts, Comments } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleWares");
const {
  register,
  login,
  getUser,
  updateProfile,
  updatePassword,
} = require("../controller/UserController");
const {
  follow,
  getFollowings,
  checkFollowStatus,
} = require("../controller/FollowController");

router.post("/", register);

router.post("/login", login);

//getUser
router.get("/:email", getUser);

//GetAllUser
router.get("/", async (req, res) => {
  const userList = await Users.findAll();
  res.json(userList);
});

//update userInfo exclude Password
router.put("/profile/:id", validateToken, updateProfile);

//Follow
router.post("/follow", validateToken, follow);

router.get("/followings/:email", validateToken, getFollowings);

router.post("/follow/status", validateToken, checkFollowStatus);

module.exports = router;
