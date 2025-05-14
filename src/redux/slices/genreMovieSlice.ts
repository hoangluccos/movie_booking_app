import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../data/Data";
import instance from "../../api/instance";

interface GenreSliceType {
  genreData: { id: string; name: string } | null;
  loading: boolean;
  error: string | null;
  listMovies: MovieType[];
}
const initialState: GenreSliceType = {
  genreData: null,
  loading: false,
  error: null,
  listMovies: [],
};
interface responseGenreMovie {
  id: string;
  name: string;
  listMovies: MovieType[];
}
export const fetchAllMoviesByGenreId = createAsyncThunk(
  "genreMovie/fetchAllMoviesByGenreId",
  async (genreId: string) => {
    try {
      const res = await instance.get(`/movies/genre?genreId=${genreId}`);
      console.log(res.data);
      return res.data.result;
    } catch (error) {
      console.log("fetchAllMovieByGenreId");
    }
  }
);
const genreMovieReducer = createSlice({
  name: "genreMovie",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAllMoviesByGenreId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMoviesByGenreId.fulfilled,
        (state, action: PayloadAction<responseGenreMovie>) => {
          state.loading = false;
          state.listMovies = action.payload.listMovies;
          const { listMovies, ...actionPayloadWithoutMovies } = action.payload;
          state.genreData = actionPayloadWithoutMovies;
        }
      )
      .addCase(fetchAllMoviesByGenreId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default genreMovieReducer.reducer;
