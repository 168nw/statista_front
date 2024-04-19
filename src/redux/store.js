import { configureStore } from "@reduxjs/toolkit";
import { postsReucer } from "./slices/posts.js";
import { authReducer } from "./slices/auth.js";

const store = configureStore({
    reducer: {
      posts: postsReucer,
      auth : authReducer,

    }
})

export default store;