import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../data/Data";
import { getApi } from "../../api/Api";

interface MoviesState {
  movies: MovieType[];
  movieDetail: MovieType | null;
  loading: boolean;
  error: string | null;
}
const initialState: MoviesState = {
  movies: [],
  movieDetail: null,
  loading: false,
  error: null,
};

interface ApiResponse {
  result: MovieType[];
}

//Action bat dong bo
export const fetchAllMovies = createAsyncThunk(
  "movies/fetchAllMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<ApiResponse>((resolve, reject) => {
        getApi("/api/movies/", false, (error, response) => {
          if (error) {
            console.log("Error with get: ", error);
            reject(error);
          } else {
            console.log("Response List Movies: ", response.result);
            resolve(response);
          }
        });
      });
      return response.result;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<MovieType[]>) => {
      state.movies = action.payload;
    },
    findMovieById: (state, action: PayloadAction<string>) => {
      state.movieDetail = state.movies.filter(
        (movie) => movie.id === action.payload
      )[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMovies.fulfilled,
        (state, action: PayloadAction<MovieType[]>) => {
          state.loading = false;
          state.movies = action.payload;
        }
      )
      .addCase(fetchAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setMovies, findMovieById } = movieSlice.actions;
export default movieSlice.reducer;
