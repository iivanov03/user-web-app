import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./post.slice";
import usersReducer from "./user.slice";

const store = configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;