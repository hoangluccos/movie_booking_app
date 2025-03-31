import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../slices/movieSlice";
import userReducer from "../slices/userSlice";
import foodReducer from "../slices/foodSlice";
import ticketReducer from "../slices/ticketSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
    user: userReducer,
    foods: foodReducer,
    tickets: ticketReducer,
  },
});

// Định nghĩa kiểu cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
