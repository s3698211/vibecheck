import styled from "styled-components";
import { StyledRegister } from "../register/RegisterStyling";
import { Modal, Button } from "react-bootstrap";

export const StyledProfile = {};

StyledProfile.Container = styled(StyledRegister.Container)``;

StyledProfile.Form = styled(StyledRegister.Form)``;

StyledProfile.FormControl = styled(StyledRegister.FormControl)``;

StyledProfile.Button = styled(StyledRegister.Button)``;

StyledProfile.ErrorMessage = styled(StyledRegister.ErrorMessage)``;

StyledProfile.Modal = styled(Modal)`
  padding-top: 100px;
`;

StyledProfile.ModalFooterButton = styled(Button)`
  margin-right: 70px;
`;
