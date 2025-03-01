import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    changeImage: (state, action) => {
      state.user = {
        ...state.user,
        image: action.payload.image,
      };
    },
  },
});
export const { setUser, changeImage } = userSlice.actions;
export default userSlice.reducer;
