import React, { useState, useEffect } from "react";

import { StyledLandingPage as slp } from "./LandingPageStyling";
import { Button, Col, Image, Row } from "react-bootstrap";
import { GoDesktopDownload } from "react-icons/go";
import { useHistory } from "react-router";
import { Box, Collapse, Typography } from "@material-ui/core";
import { FaLinkedin } from "react-icons/fa";
function LandingPage() {
  const [checked, setChecked] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div>
      <slp.Container>
        <slp.Container2Text md="6">
          <p>Welcome to VIBE CHECK</p>
        </slp.Container2Text>
        <Col md="6">
          <Image src="https://img.freepik.com/free-vector/people-waving-hand-illustration-concept_52683-29825.jpg?size=626&ext=jpg" />
        </Col>
      </slp.Container>
      <slp.Container>
        <slp.Container2Text md="6">
          Feel free to join and connect with the community.
          <slp.Button
            onClick={() => {
              history.push("/register");
            }}
          >
            JOIN US
          </slp.Button>
        </slp.Container2Text>
        <Col md="6">
          <Image src="https://media.istockphoto.com/vectors/group-of-diverse-happy-people-standing-together-rear-view-vector-id1144149601?k=20&m=1144149601&s=170667a&w=0&h=Jrg_NITroagMp5YLUIH-qm-1Yzmi-KoQWQ0GwscjKCs=" />
        </Col>
      </slp.Container>
      {/* footer */}
      <Box sx={{ bgcolor: "#3498DB", p: 6, color: "white" }} component="footer">
        <Row>
          <Col>
            <Typography variant="h6" align="center" gutterBottom>
              Author
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              Hoang Khoi To (s3698211)
            </Typography>
          </Col>
          <Col>
            <Typography variant="h6" align="center" gutterBottom>
              Contact
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              <slp.FooterLink href="https://www.linkedin.com/in/khoi-to-b037871b3/">
                <FaLinkedin /> Khoi To
              </slp.FooterLink>
              <a href="https://www.facebook.com/profile.php?id=100069231000797"></a>
            </Typography>
          </Col>
          <Col>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              component="p"
            >
              <span>Thank you for visiting the website.</span> <br /> Have a
              good day !
            </Typography>
          </Col>
        </Row>
      </Box>
    </div>
  );
}

export default LandingPage;
