import styled from "styled-components";

import { StyledCreatePost } from "./CreatePostStyling";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
export const StyledPosts = {};
StyledPosts.CardContainer = styled(Card)`
  margin-top: 10px;
  width: 500px;
  margin-bottom: 20px;
  transition: 0.5s;
  &:hover {
    filter: drop-shadow(0 0 0.75rem);
  }
`;
StyledPosts.Header = styled(Card.Header)`
  position: relative;
  color: black;
  font-weight: bold;
  font-size: small;

  text-align: left;
`;

StyledPosts.SecondaryButton = styled(Button)`
  border-radius: 6px;
  border: none;

  &.headerButton {
    float: right;
    background
    outline: none;
  }
  &.comment {
    float: center;
    background-color: #d0d3d4;
    outline: none;
  }
  &.like {
    float:left;
    margin-right: 5px;
  }
`;

StyledPosts.DropDownButton = styled(DropdownButton)`
  float: right;

  outline: none;
`;

StyledPosts.SecondaryText = styled.cite`
  position: absolute;
  margin-left: 3.1em;
  margin-top: 1.25em;
  font-size: small;
  font-weight: normal;
`;

StyledPosts.DropDownToggle = styled(Dropdown.Toggle)``;
StyledPosts.DropDownItem = styled(Dropdown.Item)``;
StyledPosts.DropDownMenu = styled(Dropdown.Menu)``;

StyledPosts.Row = styled(Row)`
  padding-left: 10px;
`;
StyledPosts.Col = styled(Col)``;
StyledPosts.Image = styled(Image)`
  height: 50%;
  width: 100%;
`;
StyledPosts.AuthorImage = styled(Image)`
  height: 2.7em;
  width: 2.7em;
  margin-right: 0.5em;
`;

StyledPosts.LineBreak = styled.h2`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 10px 0 20px;
  padding-left: 10px;
  padding-right: 10px;
`;
