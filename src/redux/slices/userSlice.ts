import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChangePasswordType, User } from "../../data/Data";
import { getApi, postApi, putApi } from "../../api/Api";
import { ResponseApiType } from "../../data/Response";
import { act } from "react";

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLogOut: boolean;
  changePasswordSuccess: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
  isLogOut: false,
  changePasswordSuccess: false,
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

//Action sendOTP
export const sendOTP = createAsyncThunk(
  "user/sendOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      await new Promise<ApiResponse>((resolve, reject) => {
        console.log("Thuc hien gui mail den: ", email);
        postApi(
          "/api/verify/forgotPassword",
          null,
          { email: email },
          true,
          (error, res) => {
            if (error) {
              console.log("Lỗi từ postApi:", error);
              reject(error); // Promise sẽ bị reject với lỗi từ API
            } else {
              console.log("Send OTP successfully");
              resolve(res as ApiResponse); // Promise resolve khi thành công
            }
          }
        );
      });
      // Không cần return response.result ở đây vì promise đã resolve
    } catch (error) {
      // Lỗi ở đây thường là lỗi xảy ra trong quá trình tạo Promise
      return rejectWithValue(error as string);
    }
  }
);
//Action changePassword
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (obj: ChangePasswordType, { rejectWithValue }) => {
    try {
      await new Promise<ApiResponse>((resolve, reject) => {
        console.log("Thuc hien viec doi Password", obj);
        putApi("/api/users/changePassword", obj, true, (error, res) => {
          if (error) {
            console.log("Loi tu post Api", error);
            reject(error);
          } else {
            console.log("ChangePassword successfully");
            resolve(res as ApiResponse);
          }
        });
      });
    } catch (error) {
      return rejectWithValue((error as string) || "Đổi mật khẩu thất bại.");
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
    updateVariablePw: (state, action: PayloadAction<boolean>) => {
      state.changePasswordSuccess = action.payload;
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
      })
      //sendOTP
      .addCase(sendOTP.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        // state.user = null;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      //changePassword
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<undefined>) => {
          state.loading = false;
          state.changePasswordSuccess = true;
        }
      )
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { setUser, setIsLogOut, updateVariablePw } = userSlice.actions;
export default userSlice.reducer;
