import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../data/Data";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    changeImage: (state, action: PayloadAction<{ avatar: string }>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          avatar: action.payload.avatar,
        };
      }
    },
  },
});
export const { setUser, changeImage } = userSlice.actions;
export default userSlice.reducer;
