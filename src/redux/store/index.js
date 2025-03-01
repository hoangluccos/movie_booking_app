import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice.js";
const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
});

export default store;
