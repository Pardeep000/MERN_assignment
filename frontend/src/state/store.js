import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./reducer/counterReducer";
import userReducer from "./reducer/userReducer";
import todoReducer from "./reducer/todoReducer";
import postReducer from "./reducer/postReducer";

const store = configureStore({
  reducer: {
    // counter: counterReducer,
    userdata: userReducer,
    tododata: todoReducer,
    postdata: postReducer
  }
});

export default store;
