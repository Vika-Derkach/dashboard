import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  isLoadeing: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userFetching(state) {
      state.isLoadeing = true;
    },
    userFetchingSuccess(state, action) {
      state.isLoadeing = false;
      state.error = "";
      state.users = action.payload;
    },
    userFetchingError(state, action) {
      state.isLoadeing = false;
      state.error = action.payload;
    },
  },
});

export default usersSlice.reducer;
