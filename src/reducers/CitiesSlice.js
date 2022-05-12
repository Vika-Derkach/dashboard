import { createSlice } from "@reduxjs/toolkit";
import { fetchCities } from "../actions/ActionCreators";

const initialCitiesState = {
  cities: [],
  isLoadeing: false,
  error: "",
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState: initialCitiesState,
  //  reducers: {
  // vacanciesFetching(state) {
  //   state.isLoadeing = true;
  // },
  // vacanciesFetchingSuccess(state, action) {
  //   state.isLoadeing = false;
  //   state.error = "";
  //   state.vacancies = action.payload;
  // },
  // vacanciesFetchingError(state, action) {
  //   state.isLoadeing = false;
  //   state.error = action.payload;
  // },
  //   },
  extraReducers: {
    [fetchCities.fulfilled.type]: (state, action) => {
      state.isLoadeing = false;
      state.error = "";
      state.cities = action.payload;
    },
    [fetchCities.pending.type]: (state) => {
      state.isLoadeing = true;
    },
    [fetchCities.rejected.type]: (state, action) => {
      state.isLoadeing = false;
      state.error = action.payload;
    },
  },
});

export default citiesSlice.reducer;
