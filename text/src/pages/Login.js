import React, { useEffect, useState } from "react";
import { StyledLogin as SL } from "../components/login/LoginStyling";

import { useHistory } from "react-router-dom";
import { Alert, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/securityAction";
import { ClipLoader } from "react-spinners";
const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const errors = useSelector((state) => state.errors);
  const history = useHistory();
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

  const handleStopLoading = () => {
    setLoading(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const loginRequest = {
      email: state.email,
      password: state.password,
    };
    setLoading(true);
    dispatch(signin(loginRequest));
    setTimeout(() => {
      handleStopLoading();
      if (Object.keys(errors).length == 0) {
        handleStopLoading();
        history.push("/home");
      }
    }, 1000);
  };

  return (
    <SL.Container>
      <Row>
        <Col md="7">
          <Image
            style={{ width: "100%" }}
            src="https://t4.ftcdn.net/jpg/03/85/44/77/360_F_385447722_G1CewuEajog5YPndBCXqjSruUfY6RwhX.jpg"
          />
        </Col>
        <Col md="5">
          <SL.FormContainer>
            <h2 style={{ color: "#85c1e9" }}>Login</h2>
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
              <SL.Form onSubmit={handleSubmit}>
                <SL.FormControl
                  required
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={state.email}
                  onChange={handleChange}
                />

                <SL.FormControl
                  required
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={handleChange}
                />
                <SL.Button type="submit">
                  {" "}
                  {loading ? (
                    <ClipLoader color="black" loading={loading} size={15} />
                  ) : (
                    "Login"
                  )}
                </SL.Button>
                <br />
                <SL.Button
                  className="register"
                  onClick={() => {
                    history.push("/register");
                  }}
                >
                  Register
                </SL.Button>
              </SL.Form>
            </center>
          </SL.FormContainer>
        </Col>
      </Row>
    </SL.Container>
  );
};

export default Login;
