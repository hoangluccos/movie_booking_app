import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../data/Data";
import { getApi, postApi, putApi } from "../../api/Api";
import { ResponseApiType } from "../../data/Response";
import { act } from "react";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLogOut: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isLogOut: false,
};
interface ApiResponse {
  result: User;
}

//Action bat dong bo
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      // Vì getApi là async, ta cần một hàm helper để lấy dữ liệu từ callback
      const response = await new Promise<ApiResponse>((resolve, reject) => {
        getApi("/api/users/bio", true, (error, res) => {
          if (error) {
            reject(error);
          } else {
            resolve(res as ApiResponse);
          }
        });
      });
      return response.result; // Trả về User cho fulfilled
    } catch (error) {
      return rejectWithValue(error as string); // Trả về lỗi cho rejected
    }
  }
);

//Action updateUser
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (dataUser: any, { rejectWithValue }) => {
    try {
      const response = await new Promise<ApiResponse>((resolve, reject) => {
        putApi("/api/users/bio", dataUser, true, (error, response) => {
          if (error) reject(error);
          else {
            console.log("put user data API successful");
            console.log(response.result);
            resolve(response as ApiResponse);
          }
        });
      });
      return response.result;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);

export const changeImage = createAsyncThunk(
  "user/changeImage",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await new Promise<ApiResponse>((resolve, reject) => {
        putApi("/api/users/avatar", data, true, (error, response) => {
          if (error) reject(error);
          else {
            console.log("put api change image successfully");
            resolve(response as ApiResponse);
          }
        });
      });
      return response.result;
    } catch (error) {
      return rejectWithValue(error as string);
    }
  }
);
//Action logout
export const logOut = createAsyncThunk(
  "user/logOut",
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<ApiResponse>((resolve, reject) => {
        postApi("/api/auth/logout", null, null, true, (error, res) => {
          if (error) {
            reject(error);
          } else {
            console.log("LogOut successfully");
            resolve(res as ApiResponse);
          }
        });
      });
      return response.result;
    } catch (error) {
      rejectWithValue(error as string);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setIsLogOut: (state, action: PayloadAction<boolean>) => {
      state.isLogOut = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isLogOut = false;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLogOut = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLogOut = false;
      })
      //updateUser
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //changeImage
      .addCase(changeImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeImage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.user = action.payload; //pull commit moi nhat github
      })
      .addCase(changeImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //logOut
      .addCase(logOut.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = null;
        state.isLogOut = true;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLogOut = true;
      });
  },
});
export const { setUser, setIsLogOut } = userSlice.actions;
export default userSlice.reducer;
