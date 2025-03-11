import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../data/Data";

interface MoviesState {
  movies: MovieType[] | null;
}
const initialState: MoviesState = {
  movies: null,
};
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieType[]>) => {
      state.movies = action.payload;
    },
    //Don't need to getMovie cause bc useSelector
    addMovie: (state, action: PayloadAction<MovieType>) => {
      if (state.movies) {
        state.movies = [...state.movies, action.payload];
      } else {
        state.movies = [action.payload];
      }
    },
  },
});

export const { setMovies, addMovie } = movieSlice.actions;
export default movieSlice.reducer;
