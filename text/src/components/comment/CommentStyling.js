import { Form, Image } from "react-bootstrap";
import styled from "styled-components";
import { StyledPosts } from "../posts/PostStyling";
export const StyledComment = {};
StyledComment.Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: no wrap;
  background-color: #d0d3d4;
  border-radius: 1em;
  text-align: left;
  align-items: center;
  margin-top: 0em;
  height: 3em;
`;

StyledComment.FormControl = styled(Form.Control)`
  width: 100%;
  height: 3em;
  border-radius: 1em;
  border: none;
`;

StyledComment.OwnerImage = styled(StyledPosts.AuthorImage)`
  width: 2em;
  height: 1.9em;
`;

StyledComment.Comment = styled.span`
  position: relative;

  justify-content: flex-start;

  margin-top: 0.1em;
`;

StyledComment.Body = styled.span`
  margin-left: 1em;
`;
