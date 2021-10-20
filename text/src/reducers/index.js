import { combineReducers } from "redux";
import errorReducer from "./errorReducer";

import securityReducer from "./securityReducer";

export default combineReducers({
  security: securityReducer,
  errors: errorReducer,
});
