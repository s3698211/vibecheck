import React, { useState } from "react";
import { StyledCreatePost as SCP } from "./CreatePostStyling";
import moment from "moment";
import { HiOutlinePhotograph } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../helper/AuthContext";
import axios from "axios";
import { useSelector } from "react-redux";

export const CreatePost = ({ user, handleReRender }) => {
  const security = useSelector((state) => state.security);

  const [post, setPost] = useState({
    id: "",
    body: "",
    imgUrl: "",
    author: security.user.email,
    authorAvatar: security.user.avatar,
  });

  const handleChange = (e) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  };

  const clearInput = () => {
    setPost({
      id: "",
      body: "",
      imgUrl: "",
      createdAt: moment().format("MMM Do YYYY"),
    });
  };

  const createPost = async () => {
    console.log("user", security.user);
    await axios
      .post(
        `http://localhost:3001/posts/${security.user.email}`,
        {
          id: post.id,
          body: post.body,
          imgUrl: post.imgUrl,
        },
        {
          headers: {
            accessToken: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        handleReRender();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    createPost();

    clearInput();
  };
  return (
    <center>
      <SCP.CardContainer>
        <center>
          <SCP.Form onSubmit={handleSubmit}>
            <SCP.CardContainer.Body>
              <SCP.FormControl
                required
                className="postBody"
                name="body"
                as="textarea"
                value={post.body}
                onChange={handleChange}
                placeholder="Write something ..."
              />
            </SCP.CardContainer.Body>
            <SCP.CardContainer.Footer>
              <SCP.Row>
                <SCP.Col>
                  <SCP.Row>
                    <SCP.Form.Label>
                      <HiOutlinePhotograph
                        style={{ marginRight: "5px", marginTop: "15px" }}
                      />
                    </SCP.Form.Label>{" "}
                    <SCP.FormControl
                      style={{ height: "35px" }}
                      className="postFooter"
                      name="imgUrl"
                      type="text"
                      value={post.imgUrl}
                      onChange={handleChange}
                      placeholder="put an ImageUrl here."
                    />
                  </SCP.Row>
                </SCP.Col>
                <SCP.Col>
                  <SCP.Button type="submit">Submit</SCP.Button>
                </SCP.Col>
              </SCP.Row>
            </SCP.CardContainer.Footer>
          </SCP.Form>
        </center>
      </SCP.CardContainer>
    </center>
  );
};
