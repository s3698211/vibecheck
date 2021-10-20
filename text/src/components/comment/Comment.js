import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import { defaultAvatar } from "../../Helper";

import { StyledComment as SC } from "./CommentStyling";
export const Comment = ({ comment }) => {
  return (
    <SC.Container>
      <SC.OwnerImage
        roundedCircle
        src={comment.User?.avatar !== "" ? comment.User?.avatar : defaultAvatar}
      />
      <SC.Comment>
        {comment.User?.email}: <SC.Body>{comment.body}</SC.Body>
      </SC.Comment>
    </SC.Container>
  );
};
