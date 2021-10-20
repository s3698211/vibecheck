import styled from "styled-components";
import FloatingLabel from "react-bootstrap-floating-label";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { StyledLandingPage } from "../../pages/LandingPageStyling";
import { StyledNavbar } from "../navbar/NavStyling";

export const StyledRegister = {};
StyledRegister.Container = styled(StyledLandingPage.Container)`
  display: flex;
  fontfamily: Nunito;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
StyledRegister.FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

StyledRegister.Form = styled(Form)``;

StyledRegister.FormControl = styled(Form.Control)`
  width: 300px;
  margin-bottom: 10px;
`;

StyledRegister.Button = styled(Button)`
  text-align: center;
  width: 300px;

  background-color: light-blue;
  border-radius: 30px;
  border: none;
`;

StyledRegister.ErrorMessage = styled.span`
  color: red;
`;
