const express = require("express");
const router = express.Router();
const { Comments, Posts, Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleWares");
const {
  addComment,
  getAllComments,
  getCommentByPostId,
} = require("../controller/CommentController");

router.get("/:postId", getCommentByPostId);

//GetAllComments
router.get("/", getAllComments);

router.post("/:postId", validateToken, addComment);
module.exports = router;
