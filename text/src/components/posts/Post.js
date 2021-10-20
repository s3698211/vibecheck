import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillDislike, AiOutlineExport } from "react-icons/ai";
import { StyledPosts as SP } from "./PostStyling";
import { AiOutlineComment, AiFillEdit, AiFillLike } from "react-icons/ai";
import { Modal, Button, Image } from "react-bootstrap";
import moment from "moment";
import { EditPost } from "./EditPost";
import { defaultAvatar } from "../../Helper";
import { CreateComment } from "../comment/CreateComment";
import { Comment } from "../comment/Comment";
import axios from "axios";
import { useHistory } from "react-router";
import { ClipLoader } from "react-spinners";
const Post = ({ post, handleReRender, user }) => {
  const currentUser = user;

  const [comments, setComments] = useState([]);
  const [reRenderPost, setReRenderPost] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [show, setShow] = useState(false);
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeNumber, setLikeNumber] = useState([]);
  const [disLikeStatus, setDisLikeStatus] = useState(false);
  const [disLikeNumber, setDisLikeNumber] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getComments();

    getLike();
    getDisLike();
    checkLikeStatus();
    checkDisLikeStatus();
  }, [reRenderPost]);

  useEffect(() => {}, [...comments]);

  useEffect(() => {
    console.log("This is Like Number", likeNumber);
  }, [...likeNumber]);

  useEffect(() => {
    console.log("This is DisLike Number", disLikeNumber);
  }, [...disLikeNumber]);

  useEffect(() => {}, [likeStatus]);
  useEffect(() => {}, [disLikeStatus]);

  const getLike = async () => {
    await axios
      .get(`http://localhost:3001/posts/like/${post.id}`, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setLikeNumber([...res.data]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const getDisLike = async () => {
    await axios
      .get(`http://localhost:3001/posts/dislike/${post.id}`, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setDisLikeNumber([...res.data]);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const checkLikeStatus = async () => {
    await axios
      .post(
        `http://localhost:3001/posts/like/status/${post.id}`,
        {
          userEmail: user.email,
        },
        {
          headers: {
            accessToken: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        if (res.data === "Liked") {
          setLikeStatus(true);
        } else {
          setLikeStatus(false);
        }
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  const checkDisLikeStatus = async () => {
    // setLoading(true);
    await axios
      .post(
        `http://localhost:3001/posts/dislike/status/${post.id}`,
        {
          userEmail: user.email,
        },
        {
          headers: {
            accessToken: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        if (res.data === "Dis-liked") {
          setDisLikeStatus(true);
        } else {
          setDisLikeStatus(false);
        }
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  const getComments = async () => {
    await axios
      .get(`http://localhost:3001/comments/${post.id}`)
      .then((res) => {
        console.log(res.data);
        setComments(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const toggleHideShowComment = () => {
    setShowComment(!showComment);
  };

  const handleLike = async () => {
    const userLike = {
      email: currentUser?.email,
    };
    await axios
      .post(`http://localhost:3001/posts/like/${post.id}`, userLike, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Liked") {
          setLikeStatus(true);
        }
        if (res.data === "Remove Like") {
          setLikeStatus(false);
        }

        //ReRender appliation state again
        getDisLike();
        getLike();
        checkLikeStatus();
        checkDisLikeStatus();
      })
      .catch((error) => console.log(error.response));
  };

  const handleDisLike = async () => {
    const userDisLike = {
      email: currentUser?.email,
    };
    await axios
      .post(`http://localhost:3001/posts/dislike/${post.id}`, userDisLike, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "DisLiked") {
          setDisLikeStatus(true);
        }
        if (res.data === "Remove dis-liked") {
          setDisLikeStatus(false);
        }
        getDisLike();
        getLike();
        checkLikeStatus();
        checkDisLikeStatus();

        // setTimeout(() => {
        //   setLoading(false);
        // }, 200);
      })
      .catch((error) => console.log(error.response));
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleReRenderPost = () => {
    setReRenderPost(!reRenderPost);
    handleReRender();
  };

  const handleDeletePost = async () => {
    await axios
      .delete(`http://localhost:3001/posts/${post.id}`, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .catch((err) => console.log(err.response.data));
    setConfirmMessage(false);
    handleReRender();
  };

  const comment = (
    <>
      <SP.LineBreak></SP.LineBreak>
      <div style={{ position: "relative" }}>
        {currentUser ? (
          <CreateComment
            user={currentUser}
            post={post}
            handleReRender={handleReRenderPost}
          />
        ) : (
          ""
        )}
        {comments.length !== 0
          ? comments.map((c, key) => (
              <>
                <Comment comment={c} key={key} />
                <br />
              </>
            ))
          : "comment"}
      </div>
    </>
  );
  return (
    <>
      <SP.CardContainer>
        <SP.Header>
          {currentUser != null && currentUser.email === post.User.email ? (
            <SP.DropDownButton id="dropdown-basic-button" variant="#f4f6f7">
              <SP.DropDownItem onClick={() => setConfirmMessage(true)}>
                <AiFillDelete /> Delete Post
              </SP.DropDownItem>
              <SP.DropDownItem onClick={handleShow}>
                <AiFillEdit /> Edit Post
              </SP.DropDownItem>
            </SP.DropDownButton>
          ) : (
            ""
          )}{" "}
          <span
            onClick={() => {
              history.push(`/profile/${post.User.email}`);
              window.location.reload(false);
            }}
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              width: "18em",
            }}
          >
            <SP.AuthorImage
              roundedCircle
              src={post.User.avatar !== "" ? post.User.avatar : defaultAvatar}
            />

            {post.User.email}
            <SP.SecondaryText>
              {moment(post.createdAt).format("MM/DD/YYYY")}
            </SP.SecondaryText>
          </span>
        </SP.Header>
        <SP.CardContainer.Body style={{ textAlign: "left" }}>
          {post.body}
          <br />
          {post.imgUrl !== "" ? <SP.Image src={post.imgUrl} /> : ""}
        </SP.CardContainer.Body>

        {/* Footer */}
        <SP.CardContainer.Footer>
          <SP.SecondaryButton
            variant={likeStatus ? "primary" : "light"}
            onClick={handleLike}
            className="like"
          >
            {loading ? (
              <ClipLoader color="black" loading={loading} size={15} />
            ) : (
              <>
                <AiFillLike /> Like {likeNumber.length}
              </>
            )}
          </SP.SecondaryButton>
          <SP.SecondaryButton
            variant={disLikeStatus ? "primary" : "light"}
            onClick={handleDisLike}
            className="like"
          >
            {loading ? (
              <ClipLoader color="black" loading={loading} size={15} />
            ) : (
              <>
                <AiFillDislike /> Dislike {disLikeNumber.length}
              </>
            )}
          </SP.SecondaryButton>
          <SP.SecondaryButton
            id="onHide"
            onClick={toggleHideShowComment}
            className="comment"
          >
            <AiOutlineComment /> Comment
          </SP.SecondaryButton>
          {showComment ? comment : ""}
        </SP.CardContainer.Footer>
        <EditPost
          sample={post}
          show={show}
          handleClose={handleClose}
          handleReRender={handleReRenderPost}
        />
      </SP.CardContainer>

      {/* ConfirmMessage */}
      <Modal show={confirmMessage}>
        <Modal.Body>Are you sure</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeletePost}>Yes</Button>
          <Button onClick={() => setConfirmMessage(false)}>No</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Post;
