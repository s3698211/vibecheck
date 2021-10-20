import axios from "axios";

import jwtDecode from "jwt-decode";

export const createNewUser = (newUser) => async (dispatch) => {
  await axios
    .post("http://localhost:3001/users", newUser)
    .then(() => {
      dispatch({
        type: "GET_ERRORS",
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const signin = (loginRequest) => async (dispatch) => {
  await axios
    .post("http://localhost:3001/users/login", loginRequest)
    .then((res) => {
      const accessToken = res.data;

      const decoded = jwtDecode(accessToken);
      localStorage.setItem("jwtToken", accessToken);
      dispatch({
        type: "SET_CURRENT_USER",
        payload: decoded,
      });

      dispatch({
        type: "GET_ERRORS",
        payload: {},
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ERRORS",
        payload: err.response.data,
      });
    });
};

export const signout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");

  dispatch({
    type: "SET_CURRENT_USER",
    payload: null,
  });
};

export const updateUser = (userInfo, id) => async (dispatch) => {
  await axios
    .put(`http://localhost:3001/users/profile/${id}`, userInfo, {
      headers: {
        accessToken: localStorage.getItem("jwtToken"),
      },
    })
    .then((res) => {
      alert("Please login again for the change can be fully applied.");
      console.log(userInfo);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
};
