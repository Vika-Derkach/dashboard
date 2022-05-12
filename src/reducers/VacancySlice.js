import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./VacanciesSlice";

export const vacancySlice = createSlice({
  name: "vacancy",
  initialState,
  reducers: {
    createVacancy(state, action) {
      state.vacancies = [...state.vacancies, { ...action.payload }];
    },
    deletingVacancy(state, action) {
      state.vacancies = state.vacancies.filter(
        (vac) => vac.id !== action.vac.id
      );
    },
  },
});

export default vacancySlice.reducer;
