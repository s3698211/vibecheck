import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import UserCard from "../components/Profile/UserCard";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { StyledProfile as SP } from "../components/Profile/EditStyling";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUser } from "../actions/securityAction";
import { BeatLoader } from "react-spinners";
import FollowObject from "../components/Profile/FollowObject";

const ProfilePage = () => {
  const { email } = useParams();

  const security = useSelector((state) => state.security);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showFollowingUser, setShowFollowingUser] = useState(false);
  const [followings, setFollowings] = useState([]);

  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    email: "",
    name: "",
    avatar: "",
  });

  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    getUser(email);
  }, []);

  useEffect(() => {
    getFollowings();
  }, [currentUser]);

  useEffect(() => {}, [followings]);

  const getFollowings = async () => {
    await axios
      .get(`http://localhost:3001/users/followings/${currentUser.email}`, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setFollowings([...res.data]);
      })
      .catch((err) => console.log(err));
  };

  const getUser = async (email) => {
    setLoading(true);
    await axios
      .get(`http://localhost:3001/users/${email}`)
      .then((res) => {
        setCurrentUser({ ...res.data });
        setTimeout(() => {
          setLoading(false);
        }, 200);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onNo = () => {
    setShowEditProfile(false);
  };

  const handleShowEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      email: state.email,
      name: state.name,
      avatar: state.avatar,
    };
    dispatch(updateUser(userInfo, security.user?.id));
    setShowEditProfile(false);
  };

  return (
    <div>
      <center>
        {loading ? (
          <BeatLoader color="black" loading={loading} size={15} />
        ) : (
          <UserCard
            handleShowEditProfile={handleShowEditProfile}
            user={currentUser}
            loggedInUser={security.user}
          />
        )}

        {loading ? (
          <BeatLoader color="black" loading={loading} size={15} />
        ) : (
          <>
            <Button
              variant="light"
              onClick={() => {
                setShowFollowingUser(true);
              }}
              style={{ marginTop: "2px", borderRadius: "10px" }}
            >
              FOLLOWING {followings.length}
            </Button>
          </>
        )}
      </center>
      {/* Edit User name and email */}
      <SP.Modal show={showEditProfile}>
        <Modal.Title>
          <center>Edit Profile</center>
        </Modal.Title>
        <Modal.Body>
          <center>
            <SP.Form onSubmit={handleProfileSubmit}>
              <SP.FormControl
                required
                name="email"
                type="email"
                value={state.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <SP.FormControl
                required
                name="name"
                type="text"
                value={state.name}
                onChange={handleChange}
                placeholder="Full name"
              />
              <SP.FormControl
                name="avatar"
                type="text"
                value={state.avatar}
                onChange={handleChange}
                placeholder="Your Avatar Image: Put imageUrl here"
              />

              <Modal.Footer>
                <SP.ModalFooterButton type="submit" variant="success">
                  Finish
                </SP.ModalFooterButton>

                <SP.ModalFooterButton variant="danger" onClick={onNo}>
                  Cancel
                </SP.ModalFooterButton>
              </Modal.Footer>
            </SP.Form>
          </center>
        </Modal.Body>
      </SP.Modal>

      {/* Show following user */}
      <SP.Modal
        show={showFollowingUser}
        onHide={() => {
          getFollowings();
          setShowFollowingUser(false);
        }}
      >
        <Modal.Body>
          <center>
            {followings.length !== 0
              ? followings.map((following) => (
                  <FollowObject
                    loggedInUser={security.user}
                    currentUser={currentUser}
                    following={following}
                  />
                ))
              : "There is no any followings."}
          </center>
        </Modal.Body>
      </SP.Modal>
    </div>
  );
};

export default ProfilePage;
