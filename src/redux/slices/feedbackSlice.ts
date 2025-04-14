import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackType } from "../../data/Data";
import { getApi } from "../../api/Api";
import { ResponseApiType } from "../../data/Response";

interface FeedbackState {
  feedbacks: FeedbackType[];
  loading: boolean;
  error: string | null;
}
const initialState: FeedbackState = {
  feedbacks: [],
  loading: false,
  error: null,
};
//Action bat dong bo
export const fetchAllFeedbackByMovie = createAsyncThunk<
  FeedbackType[], // kiểu dữ liệu trả về (fulfilled)
  string, // kiểu của tham số đầu vào
  { rejectValue: string } // optional: kiểu dữ liệu nếu reject
>("feedbacks/fetchAllFeedbackByMovie", async (movieId, { rejectWithValue }) => {
  try {
    const response = await new Promise<ResponseApiType>((resolve, reject) => {
      getApi(
        `/api/feedbacks/${movieId}/all`,
        true,
        (error, res: ResponseApiType) => {
          if (error) {
            console.log("Error with get All feedbacks Api: ", error);
            reject(error);
          } else {
            console.log("Response All feedbacks Api", res.result);
            resolve(res);
          }
        }
      );
    });
    return response.result;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});
const feedbackSlice = createSlice({
  name: "feedbacks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFeedbackByMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllFeedbackByMovie.fulfilled,
        (state, action: PayloadAction<FeedbackType[]>) => {
          state.loading = false;
          state.feedbacks = action.payload;
        }
      )
      .addCase(fetchAllFeedbackByMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default feedbackSlice.reducer;
