import styled from "styled-components";
import { Form, Modal, Button, Card, Row, Col } from "react-bootstrap";

export const StyledCreatePost = {};

StyledCreatePost.CardContainer = styled(Card)`
  margin-top: 10px;
  width: 500px;
  margin-bottom: 60px;
`;
StyledCreatePost.CardBody = styled(Card.Body)``;
StyledCreatePost.Form = styled(Form)`
  width: 100%;
`;
StyledCreatePost.FormControl = styled(Form.Control)`
  border-radius: 20px;
  background-color: #e0e0e0;
  border: none;
  width: 200px;
  height: 25px;
  outline: none;
  &.postBody {
    width: 450px;
    padding-top: 10px;
    padding-left: 5px;

    height: 50px;
  }
  &.postFooter {
    margin-top: 5px;
  }
`;
StyledCreatePost.DisplayError = styled(Modal)``;
StyledCreatePost.Button = styled(Button)`
  margin-top: 5px;
  height: 35px;
  width: 100px;
  font-size: medium;
  border-radius: 10px;
  margin-left: 30px;
  float: right;
`;
StyledCreatePost.Row = styled(Row)`
  padding-left: 10px;
`;
StyledCreatePost.Col = styled(Col)``;
