import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CouponType } from "../../data/Data";
import { getApi } from "../../api/Api";
import { ResponseApiType } from "../../data/Response";

interface CouponState {
  coupons: CouponType[];
  loading: boolean;
  error: string | null;
}
const initialState: CouponState = {
  coupons: [],
  loading: false,
  error: null,
};
//Action bat dong bo
export const fetchAllCoupons = createAsyncThunk(
  "foods/fetchAllCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<ResponseApiType>((resolve, reject) => {
        getApi("/api/coupons/", true, (error, res: ResponseApiType) => {
          if (error) {
            console.log("Error with get All coupon Api: ", error);
            reject(error);
          } else {
            console.log("Response All Coupon Api", res.result);
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
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCoupons.fulfilled,
        (state, action: PayloadAction<CouponType[]>) => {
          state.loading = false;
          state.coupons = action.payload;
        }
      )
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default couponSlice.reducer;
