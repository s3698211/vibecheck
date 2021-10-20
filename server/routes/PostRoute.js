const express = require("express");
const router = express.Router();
const { Posts, Comments, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleWares");
const {
  deletePost,

  createPost,
  getPostById,
  getAllPosts,
  updatePost,
} = require("../controller/PostController");
const {
  likePost,
  getLikes,
  checkUserLikeStatus,
} = require("../controller/LikeController");
const {
  disLikedPost,
  getDisLiked,
  checkUserDisLikeStatus,
} = require("../controller/DislikeController");

//getAllPost
router.get("/", validateToken, getAllPosts);

//create post
router.post("/:email", validateToken, createPost);

//get post by Id
router.get("/:id", validateToken, getPostById);

//update post
router.put("/:id", validateToken, updatePost);

//delete post
router.delete("/:id", validateToken, deletePost);

//"Like" a post
router.post("/like/:id", validateToken, likePost);

//"DisLike" a post
router.post("/dislike/:id", validateToken, disLikedPost);

//Get "Likes" of a post
router.get("/like/:id", validateToken, getLikes);

//Check "Like Status"
router.post("/like/status/:id", validateToken, checkUserLikeStatus);

//Get "Disliked" of a post
router.get("/dislike/:id", validateToken, getDisLiked);

//Check "DisLike Status"
router.post("/dislike/status/:id", validateToken, checkUserDisLikeStatus);

module.exports = router;
