import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodType } from "../../data/Data";
import { getApi } from "../../api/Api";
import { ResponseApiType } from "../../data/Response";

interface FoodState {
  foods: FoodType[];
  loading: boolean;
  error: string | null;
}
const initialState: FoodState = {
  foods: [],
  loading: false,
  error: null,
};

//Action bat dong bo
export const fetchAllFoods = createAsyncThunk(
  "foods/fetchAllFoods",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<ResponseApiType>((resolve, reject) => {
        getApi("/api/foods/", true, (error, res: ResponseApiType) => {
          if (error) {
            console.log("Error with get AllFoodAPi: ", error);
            reject(error);
          } else {
            console.log("Response All foods", res.result);
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
const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFoods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllFoods.fulfilled,
        (state, action: PayloadAction<FoodType[]>) => {
          state.loading = false;
          state.foods = action.payload;
        }
      )
      .addCase(fetchAllFoods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default foodSlice.reducer;
