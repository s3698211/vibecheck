import React, { useState, useEffect } from "react";
import { StyledNavbar as SN } from "./NavStyling";
import { Route, useHistory, Redirect } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../../actions/securityAction";
export const NavbarComponent = () => {
  const history = useHistory();
  const [reRender, SetReRender] = useState(false);
  const [show, setShow] = useState(false);
  const security = useSelector((state) => state.security);
  const dispatch = useDispatch();

  const onYes = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("jwtToken");
    dispatch(signout());
    setShow(false);
    history.push("/");
  };
  const onNo = () => {
    setShow(false);
  };

  const logOut = () => {
    setShow(true);
  };

  return (
    <SN.Navbar bg="dark" variant="dark">
      <SN.Container>
        <SN.Link to="/">
          <SN.Brand>Vibe Check</SN.Brand>
        </SN.Link>

        <SN.Nav className="me-auto">
          <SN.Link to="/home">
            <SN.Button variant="dark">Home</SN.Button>
          </SN.Link>

          {security.validToken ? (
            <SN.Button
              onClick={() => {
                history.push(`/profile/${security.user.email}`);
                window.location.reload(false);
              }}
              variant="dark"
            >
              {security.user.email}
            </SN.Button>
          ) : (
            ""
          )}
          {security.validToken ? (
            <SN.Button onClick={logOut} variant="dark">
              Logout
            </SN.Button>
          ) : (
            <SN.Link to="/login">
              <SN.Button variant="dark">Login</SN.Button>
            </SN.Link>
          )}
        </SN.Nav>
      </SN.Container>
      <Modal show={show}>
        <Modal.Body>
          <center>Are you sure</center>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" onClick={onYes}>
            Yes
          </Button>
          <Button color="secondary" onClick={onNo}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </SN.Navbar>
  );
};

export default function NavRoute({ exact, path, component: Component }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        localStorage.getItem("jwtToken") ? (
          <div>
            <NavbarComponent />
            <Component {...props} />
          </div>
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}
