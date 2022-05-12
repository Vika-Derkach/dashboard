import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vacancies: [],
  isLoadeing: false,
  error: "",
};

export const vacanciesSlice = createSlice({
  name: "vacancies",
  initialState,
  reducers: {
    vacanciesFetching(state) {
      state.isLoadeing = true;
    },
    vacanciesFetchingSuccess(state, action) {
      state.isLoadeing = false;
      state.error = "";
      state.vacancies = action.payload;
    },
    vacanciesFetchingError(state, action) {
      state.isLoadeing = false;
      state.error = action.payload;
    },
  },
  //   extraReducers: {
  //     [fetchVacancies.fulfilled.type]: (state, action) => {
  //       state.isLoadeing = false;
  //       state.error = "";
  //       state.vacancies = action.payload;
  //     },
  //     [fetchVacancies.pending.type]: (state) => {
  //       state.isLoadeing = true;
  //     },
  //     [fetchVacancies.rejected.type]: (state, action) => {
  //       state.isLoadeing = false;
  //       state.error = action.payload;
  //     },
  //   },
});

export default vacanciesSlice.reducer;
