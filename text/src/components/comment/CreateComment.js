import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { StyledComment as SC } from "./CommentStyling";
export const CreateComment = ({ user, post, handleReRender }) => {
  const [comment, setComment] = useState({
    username: user.email,
    userAvatar: user.avatar,
    body: "",
    PostId: post.id,
  });

  const handleChange = (e) => {
    setComment((comment) => ({
      ...comment,
      [e.target.name]: e.target.value,
    }));
  };

  //submit when user hit enter
  const handleKeyPressed = (e) => {
    if (e.charCode == 13) {
      handleSubmit();
    }
  };

  const clearInput = () => {
    setComment({
      owner: user.email,
      body: "",
    });
  };

  const addComment = async () => {
    await axios
      .post(
        `http://localhost:3001/comments/${post.id}`,
        {
          body: comment.body,
        },
        {
          headers: {
            accessToken: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => handleReRender())
      .catch((err) => {
        console.log("CreateComment", err.response);
      });
  };

  const handleSubmit = () => {
    addComment();
    clearInput();
  };

  return (
    <div>
      <Form>
        <SC.FormControl
          type="submit"
          required
          name="body"
          value={comment.body}
          as="textarea"
          onChange={handleChange}
          onKeyPress={handleKeyPressed}
          placeholder="Add comments"
        />
      </Form>
    </div>
  );
};
