import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";

const initialState = {};
const middleware = [thunk];

let store;

const persistConfig = {
  key: "root",
  storage: sessionStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
if (window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools) {
  store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware), ReactReduxDevTools)
  );
} else {
  store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
}

const persistor = persistStore(store);
export default store;
