import React, { useState, useEffect } from "react";
import { CreatePost } from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import axios from "axios";

import { useSelector } from "react-redux";

export const Home = () => {
  const [reRender, setReRender] = useState(false);
  const security = useSelector((state) => state.security);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("ReRender");
    getPosts();
  }, [reRender]);

  const getPosts = async () => {
    await axios
      .get("http://localhost:3001/posts", {
        headers: {
          accessToken: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };
  const handleReRender = () => {
    setReRender(!reRender);
  };

  return (
    <div>
      {security.validToken ? (
        <CreatePost
          user={security.user}
          handleReRender={handleReRender}
          reRender={reRender}
        />
      ) : (
        ""
      )}
      <center>
        {posts.length !== 0
          ? posts.map((post, key) => (
              <Post
                key={key}
                post={post}
                user={security.user}
                handleReRender={handleReRender}
              />
            ))
          : ""}
      </center>
    </div>
  );
};
