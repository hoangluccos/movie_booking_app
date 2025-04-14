import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import userReducer from "../slices/userSlice";
import foodReducer from "../slices/foodSlice";
import ticketReducer from "../slices/ticketSlice";
import couponReducer from "../slices/couponSlice";
import feedbackReducer from "../slices/feedbackSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
    foods: foodReducer,
    tickets: ticketReducer,
    coupons: couponReducer,
    feedbacks: feedbackReducer,
  },
});

// Định nghĩa kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
