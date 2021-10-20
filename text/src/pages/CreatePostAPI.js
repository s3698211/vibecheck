import React, { useEffect } from "react";
import { useState } from "react";
import { StyledCreatePost as SCP } from "../components/posts/CreatePostStyling";
import moment from "moment";
import { HiOutlinePhotograph } from "react-icons/hi";
import axios from "axios";
import { Card, Col, Row } from "react-bootstrap";

const CreatePostAPI = () => {
  const [post, setPost] = useState({
    body: "",
    imgUrl: null,

    author: "khoi",
    authorAvatar: "",
  });
  const [postList, setPostList] = useState([]);
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  console.log(sessionStorage.getItem("accessToken"));
  const getAllPosts = async () => {
    await axios
      .get("http://localhost:3001/posts")
      .then((res) => setPostList(res.data))
      .catch((err) => console.log(err.response.data));
  };

  const getAllComments = async () => {
    await axios
      .get("http://localhost:3001/comments")
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err.response.data));
  };
  const createPost = async () => {
    await axios
      .post("http://localhost:3001/posts", post, {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setReload(!reload);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getAllComments();
    getAllPosts();
  }, [reload]);

  const handleChange = (e) => {
    setPost((post) => ({
      ...post,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    createPost();
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

      <div>
        <Col>
          <h1>Posts</h1>
          {postList.map((p) => (
            <Card>
              <Card.Title>{p.author}</Card.Title>
              <Card.Body>{p.body}</Card.Body>
            </Card>
          ))}
        </Col>
        <Col></Col>
      </div>
    </center>
  );
};

export default CreatePostAPI;
