import styled from "styled-components";
import { Button, Col, Container } from "react-bootstrap";
import bgImg from "../assets/images/LandingPage.jpg";
export const StyledLandingPage = {};

StyledLandingPage.Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

StyledLandingPage.Header1 = styled.h1`
  padding-top: 250px;
  color: white;
  font-size: 60px;
  font-weight: bolder;
`;

StyledLandingPage.Button = styled(Button)`
  margin-top: 70px;
  font-weight: bolder;
  border-radius: 6px;
  font-size: 30px;
  border: none;
  cursor: pointer;
  background-size: 200%;

  background-image: linear-gradient(to left, #00b4db, #0083b0, #0083b0);
  transition: background-position 1.5s;
  &:hover {
    background-position: right;
  }
`;

StyledLandingPage.Container2Text = styled(Col)`
  display: flex;
  // background: #fbeee6;
  flex-direction: column;

  color: #85c1e9;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-size: 250%;
  font-family: Garamond, serif;
  font-weight: bold;
`;

StyledLandingPage.FooterLink = styled.a`
  color: white;
`;
