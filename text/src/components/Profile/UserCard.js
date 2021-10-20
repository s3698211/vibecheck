import React, { useEffect, useState } from "react";
import moment from "moment";
import { useHistory } from "react-router";
import { Card, Button, Modal } from "react-bootstrap";
import { defaultAvatar } from "../../Helper";
import { StyledUserCard as SUC } from "./UserCardStyling";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const UserCard = ({ user, handleShowEditProfile, loggedInUser }) => {
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followStatus, setFollowStatus] = useState("");

  useEffect(() => {
    getFollowStatus();
  }, []);

  const handeDelete = () => {
    localStorage.removeItem(`user/${user.email}`);

    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes(`post/${user.email}`)) {
        localStorage.removeItem(localStorage.key(i));
      }
    }
    localStorage.setItem("currentUser", "");
    alert("Deleted user.");
    setShow(false);
    history.push("/home");
  };

  const getFollowStatus = async () => {
    setLoading(true);
    const followRequest = {
      main: loggedInUser?.email,
      target: user.email,
    };

    await axios
      .post("http://localhost:3001/users/follow/status", followRequest, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        if (res.data === "Following") {
          setFollowStatus("Following");
        }
        if (res.data === "Not Following") {
          setFollowStatus("Follow");
        }

        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };
  const follow = async () => {
    setLoading(true);
    const followRequest = {
      main: loggedInUser?.email,
      target: user.email,
    };
    await axios
      .post("http://localhost:3001/users/follow", followRequest, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        if (res.data === "Followed") {
          setFollowStatus("Following");
        }
        if (res.data === "Unfollow") {
          setFollowStatus("Follow");
        }

        setTimeout(() => {
          setLoading(false);
        }, 500);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err.response.data);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  return (
    <>
      <Card style={{ width: "18rem", marginTop: "10px" }}>
        <SUC.ImageProfile
          rounded
          variant="top"
          src={user.avatar !== "" ? user.avatar : defaultAvatar}
        />
        <Card.Body>
          <Card.Title>{user.email}</Card.Title>

          <Card.Text>Name: {user.name}</Card.Text>
          <Card.Text>
            Join: {moment(user.createdAt).format("MM/DD/YYYY")}
          </Card.Text>
          {user.id == loggedInUser.id ? (
            <>
              <Button
                style={{ marginRight: "10px" }}
                onClick={handleShowEditProfile}
                variant="primary"
              >
                Edit Profile
              </Button>
              <Button
                onClick={() => {
                  setShow(true);
                }}
                variant="danger"
              >
                Delete account
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                follow();
              }}
              style={{ width: "100%" }}
              variant="primary"
            >
              {loading ? (
                <ClipLoader color="black" loading={loading} size={15} />
              ) : (
                <span>{followStatus}</span>
              )}
            </Button>
          )}
        </Card.Body>
      </Card>
      <Modal show={show}>
        <Modal.Body> Are you sure</Modal.Body>
        <Modal.Footer>
          <Button onClick={handeDelete} variant="danger">
            Yes
          </Button>
          <Button onClick={() => setShow(false)} variant="primary">
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCard;
