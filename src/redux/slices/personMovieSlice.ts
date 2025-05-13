import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieType } from "../../data/Data";
import instance from "../../api/instance";

interface PersonMovieState {
  listMovies: MovieType[];
  personInfo: PersonInfoType | null;
  loading: boolean;
  error: string | null;
}
interface PersonInfoType {
  dateOfBirth: string;
  gender: boolean;
  id: string;
  image: string;
  job: { id: string; name: string };
  name: string;
}
interface responsePersonMovie {
  dateOfBirth: string;
  gender: boolean;
  id: string;
  image: string;
  job: { id: string; name: string };
  listMovies: MovieType[];
  name: string;
}
const initialState: PersonMovieState = {
  listMovies: [],
  personInfo: null,
  loading: false,
  error: null,
};
export const fetchAllMovieByPersonId = createAsyncThunk(
  "personMovies/fetchAllMovieByPersonId",
  async (personId: string) => {
    try {
      const res = await instance.get(`/movies/person?personId=${personId}`);
      console.log("all movies by personId: ", res.data);
      return res.data.result as responsePersonMovie;
    } catch (error) {
      console.log("error fetchAllMovieByPersonId", error);
    }
  }
);

const personMovieSlice = createSlice({
  name: "personMovies",
  initialState,
  reducers: {},
  //extraReducers : fetch api reducer
  extraReducers: (builder) => {
    //fetchAllMovieByPersonId
    builder
      .addCase(fetchAllMovieByPersonId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMovieByPersonId.fulfilled,
        (state, action: PayloadAction<responsePersonMovie>) => {
          state.loading = false;
          state.listMovies = action.payload.listMovies;
          const { listMovies, ...actionPayloadWithoutMovies } = action.payload;
          state.personInfo = actionPayloadWithoutMovies;
        }
      )
      .addCase(fetchAllMovieByPersonId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default personMovieSlice.reducer;
