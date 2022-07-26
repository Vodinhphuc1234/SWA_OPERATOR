import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload;
    },
  },
});

export const { setUser } = navSlice.actions;
export const selectUser = (state) => state.nav.user;
export default navSlice.reducer;
