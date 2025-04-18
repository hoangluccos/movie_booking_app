import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackRequestType, TicketType } from "../../data/Data";
import { ResponseApiType } from "../../data/Response";
import { getApi, postApi } from "../../api/Api";
import { compareDates } from "../../utils/Utils";

interface TicketState {
  tickets: TicketType[];
  loading: boolean;
  error: string | null;
}
const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

export const fetchAllTickets = createAsyncThunk(
  "tickets/fetchAllTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<ResponseApiType>((resolve, reject) => {
        getApi("/api/users/ticket", true, (error, res) => {
          if (error) {
            console.log("Error with get All tickets", error);
            reject(res);
          } else {
            console.log("response api all tickets", res);
            resolve(res);
          }
        });
      });
      return response.result;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
export const postFeedback = createAsyncThunk(
  "tickets/postFeedback",
  async (obj: FeedbackRequestType, { rejectWithValue }) => {
    try {
      const response = await new Promise<ResponseApiType>((resolve, reject) => {
        postApi("/api/feedbacks/", null, obj, true, (error, res) => {
          if (error) {
            console.log("Error when post feedback", error);
            reject(res);
          } else {
            console.log("Post feedback successfully", res);
            resolve(res);
          }
        });
      });
      return response.result;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    sortByNearestDate: (state) => {
      state.tickets.sort((a, b) => compareDates(a.date, b.date));
    },
    sortByFarthestDate: (state) => {
      state.tickets.sort((a, b) => compareDates(b.date, a.date));
    },
  },
  extraReducers: (builder) => {
    builder
      //fetchAllTickets
      .addCase(fetchAllTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllTickets.fulfilled,
        (state, action: PayloadAction<TicketType[]>) => {
          state.loading = false;
          state.tickets = action.payload;
        }
      )
      .addCase(fetchAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //postFeedback
      .addCase(postFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFeedback.fulfilled, (state, action: PayloadAction<void>) => {
        state.loading = false;
        // state.tickets = action.payload;
      })
      .addCase(postFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { sortByNearestDate, sortByFarthestDate } = ticketSlice.actions;
export default ticketSlice.reducer;
