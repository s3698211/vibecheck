import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router";
import { ClipLoader } from "react-spinners";

const FollowObject = ({ loggedInUser, currentUser, following }) => {
  const [followStatus, setFollowStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    getFollowStatus();
  }, []);

  useEffect(() => {}, [followStatus]);

  const getFollowStatus = async () => {
    setLoading(true);

    const followRequest = {
      main: loggedInUser.email,
      target: following.email,
    };

    console.log("GET FOLLOW STATUS", followRequest);

    await axios
      .post("http://localhost:3001/users/follow/status", followRequest, {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "Following") {
          setFollowStatus("UnFollow");
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

  const handleFollow = async (mainUser, targetUser) => {
    // setLoading(true);
    if (mainUser.id == targetUser.id) {
      setFollowStatus("You");
      return;
    } else {
      const followRequest = {
        main: mainUser.email,
        target: targetUser.email,
      };
      console.log("handleFollow", followRequest);

      await axios
        .post("http://localhost:3001/users/follow", followRequest, {
          headers: {
            accessToken: localStorage.getItem("jwtToken"),
          },
        })
        .then((res) => {
          console.log("HandleFollow", res.data);
          if (res.data === "Followed") {
            setFollowStatus("Unfollow");
          }
          if (res.data === "Unfollow") {
            setFollowStatus("Follow");
          }
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }
  };
  return (
    <>
      <Row style={{ marginBottom: "10px" }}>
        <Col>
          <Button
            variant="dark"
            onClick={() => {
              history.push(`/profile/${following.email}`);
              window.location.reload(false);
            }}
          >
            {following.email}
          </Button>
        </Col>
        <Col>
          {currentUser.email !== loggedInUser.email ? (
            //IF user is at another user's profile page
            <>
              <Button
                onClick={() => {
                  setClick(true);
                  handleFollow(loggedInUser, following);
                }}
                variant="light"
              >
                {loading ? (
                  <ClipLoader color="black" loading={loading} size={15} />
                ) : (
                  <span>
                    {followStatus !== "" ? followStatus : "No Status"}
                  </span>
                )}
              </Button>
            </>
          ) : (
            <>
              {/* //If user is at their current page */}
              <Button
                onClick={() => {
                  setClick(true);
                  handleFollow(loggedInUser, following);
                }}
                variant="light"
              >
                {click ? followStatus : "UnFollow"}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default FollowObject;
