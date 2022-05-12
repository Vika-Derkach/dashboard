import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./VacanciesSlice";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    createVacancy(state, action) {
      state.vacancies = [...state.vacancies, { ...action.payload }];
    },
  },
});

export default vacancySlice.reducer;
