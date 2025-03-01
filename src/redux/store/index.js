import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice.js";
import userReducer from "../slices/userSlice.js";
const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
  },
});

export default store;
