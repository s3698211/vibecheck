import React, { useState } from "react";
import { StyledCreatePost as SCP } from "./CreatePostStyling";
import moment from "moment";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";

export const EditPost = ({ show, handleReRender, handleClose, sample }) => {
  const currentUser = useSelector((state) => state.security.user);

  const [post, setPost] = useState({
    id: sample.id,
    body: sample.body,
    imgUrl: sample.imgUrl,
  });

  const handleChange = (e) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
      id: post.id,
      body: post.body,
      imgUrl: post.imgUrl,
    };
    updatePost(updatedPost);

    handleClose();
  };

  const updatePost = async (updatePost) => {
    await axios
      .put(`http://localhost:3001/posts/${post.id}`, updatePost, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        handleReRender();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  return (
    <>
      <Modal show={show}>
        <center>
          <SCP.CardContainer style={{ width: "100%" }}>
            <center>
              <SCP.Form onSubmit={handleSubmit}>
                <SCP.CardContainer.Title>Edit Post</SCP.CardContainer.Title>
                <SCP.CardBody>
                  <SCP.FormControl
                    required
                    className="postBody"
                    name="body"
                    as="textarea"
                    value={post.body}
                    onChange={handleChange}
                    placeholder="Write something ..."
                  />
                </SCP.CardBody>
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
      </Modal>
    </>
  );
};
