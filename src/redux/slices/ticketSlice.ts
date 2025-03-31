import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TicketType } from "../../data/Data";
import { ResponseApiType } from "../../data/Response";
import { getApi } from "../../api/Api";

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
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default ticketSlice.reducer;
