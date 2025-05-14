import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import userReducer from "../slices/userSlice";
import foodReducer from "../slices/foodSlice";
import ticketReducer from "../slices/ticketSlice";
import couponReducer from "../slices/couponSlice";
import feedbackReducer from "../slices/feedbackSlice";
import personMovieReducer from "../slices/personMovieSlice";
import genreMovieReducer from "../slices/genreMovieSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
    foods: foodReducer,
    tickets: ticketReducer,
    coupons: couponReducer,
    feedbacks: feedbackReducer,
    personMovie: personMovieReducer,
    genreMovie: genreMovieReducer,
  },
});

// Định nghĩa kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
