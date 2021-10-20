import React, { useState, useEffect } from "react";

import { useHistory } from "react-router";
import { StyledRegister as SR } from "../components/register/RegisterStyling";
import { Modal, Alert, Row, Col, Image } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { createNewUser } from "../actions/securityAction";

export const Register = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);
  const errors = useSelector((state) => state.errors);

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    //If errors object is empty, we dont display the alert
    if (Object.keys(errors).length == 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [{ ...errors }]);

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleStopLoading = () => {
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
      name: state.name,
      avatar: state.avatar,
    };
    setLoading(true);
    dispatch(createNewUser(newUser, history, handleStopLoading));
    setTimeout(() => {
      handleStopLoading();
      if (Object.keys(errors).length == 0) {
        handleStopLoading();
        history.push("/login");
      }
    }, 1000);
  };

  return (
    <SR.Container>
      <Row>
        <Col md="7">
          <Image
            style={{ width: "100%" }}
            src="https://t4.ftcdn.net/jpg/03/85/44/77/360_F_385447722_G1CewuEajog5YPndBCXqjSruUfY6RwhX.jpg"
          />
        </Col>
        <Col md="5">
          <SR.FormContainer>
            <h2 style={{ color: "#85c1e9" }}>Register</h2>
            <Alert show={show} variant="danger" onClose={() => setShow(false)}>
              <center>
                {" "}
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              </center>

              <center>
                <p>{errors.message}</p>
              </center>
            </Alert>
            <center>
              <SR.Form onSubmit={handleSubmit}>
                <SR.FormControl
                  required
                  name="email"
                  type="email"
                  value={state.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                />

                <SR.FormControl
                  required
                  name="name"
                  type="text"
                  value={state.name}
                  onChange={handleChange}
                  placeholder="Full name"
                />
                <SR.FormControl
                  required
                  name="password"
                  type="password"
                  value={state.password}
                  onChange={handleChange}
                  placeholder="Password"
                />

                <SR.FormControl
                  required
                  name="confirmPassword"
                  type="password"
                  value={state.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />

                <SR.Button type="submit">
                  {" "}
                  {loading ? (
                    <ClipLoader color="black" loading={loading} size={15} />
                  ) : (
                    "Register"
                  )}
                </SR.Button>
                <br />
                <a href="/login">
                  <span>Already have an account ?</span>
                </a>
              </SR.Form>
            </center>
          </SR.FormContainer>
        </Col>
      </Row>
    </SR.Container>
  );
};
