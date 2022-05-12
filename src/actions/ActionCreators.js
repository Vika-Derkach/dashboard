import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { vacanciesSlice } from "../reducers/VacanciesSlice";
import { vacancySlice } from "../reducers/VacancySlice";

export const fetchCities = createAsyncThunk(
  "cities/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/cities");
      console.log("cities", response);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Inposible to load cities");
    }
  }
);
export const fetchVacancies = () => async (dispatch) => {
  try {
    dispatch(vacanciesSlice.actions.vacanciesFetching());
    const response = await axios.get("http://localhost:3001/vacancies");
    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

export const fetchCreateVacancy = (vacancy) => async (dispatch) => {
  try {
    const response = await axios.post("http://localhost:3001/vacancy", {
      vacancy,
    });
    dispatch(vacancySlice.actions.createVacancy(vacancy));
    dispatch(vacanciesSlice.actions.vacanciesFetching());

    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};
