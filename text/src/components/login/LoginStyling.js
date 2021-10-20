import styled from "styled-components";
import { StyledRegister } from "../register/RegisterStyling";
import { StyledLandingPage } from "../../pages/LandingPageStyling";
export const StyledLogin = {};

StyledLogin.Container = styled.div`
  display: flex;
  fontfamily: Nunito;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

StyledLogin.Button = styled(StyledRegister.Button)`
  margin-bottom: 2px;
  &.register {
    background: #52be80;

    &:hover {
      background: #27ae60;
    }
  }
`;

StyledLogin.FormControl = styled(StyledRegister.FormControl)``;
StyledLogin.ErrorMessage = styled(StyledRegister.ErrorMessage)``;
StyledLogin.Form = styled(StyledRegister.Form)``;

StyledLogin.FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
