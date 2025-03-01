import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    //Don't need to getMovie cause bc useSelector
    addMovie: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
  },
});

export const { setMovies, addMovie } = movieSlice.actions;
export default movieSlice.reducer;
