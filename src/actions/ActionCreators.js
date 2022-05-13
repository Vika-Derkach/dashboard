import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { vacanciesSlice } from "../reducers/VacanciesSlice";

export const fetchCities = createAsyncThunk(
  "cities/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("http://localhost:3001/cities");

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue("Inposible to load cities");
    }
  }
);
export const fetchVacancies = () => async (dispatch) => {
  try {
    const getCities = await axios.get("http://localhost:3001/cities");
    let obj = getCities.data.find((o) => o.id === "38");
    console.log(obj, "getCities");

    dispatch(vacanciesSlice.actions.vacanciesFetching());
    const response = await axios.get("http://localhost:3001/vacancies");
    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

export const createNewVacancy = (vacancy) => async (dispatch) => {
  try {
    if (vacancy.priceFromTo && vacancy.priceFromTo.to) {
      vacancy.price = vacancy.priceFromTo;
    } else if (vacancy.priceOne) {
      vacancy.price = vacancy.priceOne;
    } else {
      vacancy.price = vacancy.priceEmtpy;
    }

    const cityName = vacancy.city;

    const cityInfo = await axios.get(
      `http://localhost:3001/cities?search=${cityName}`
    );

    vacancy.city = cityInfo.data[0].id;
    const response = await axios.post("http://localhost:3001/vacancy", {
      vacancy,
    });
    console.log(response);

    dispatch(vacanciesSlice.actions.vacanciesFetching());

    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

export const deleteVacancy = (vacancy) => async (dispatch) => {
  try {
    console.log(vacancy, "vacancy del");
    await axios.delete(
      `http://localhost:3001/vacancy/${vacancy.id}`,
      {
        vacancy,
      },
      {
        headers: { "Content-Type": `Bearer ${JSON.stringify(vacancy)}` },
      }
    );
    const response = await axios.get("http://localhost:3001/vacancies");
    dispatch(vacanciesSlice.actions.vacanciesFetching());

    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

export const updateVacancy = (vacancy) => async (dispatch) => {
  try {
    console.log(vacancy, "vacancy put");
    await axios.put(
      `http://localhost:3001/vacancy/${vacancy.id}`,
      {
        vacancy,
      },
      {
        headers: { "Content-Type": `Bearer ${JSON.stringify(vacancy)}` },
      }
    );
    const response = await axios.get("http://localhost:3001/vacancies");
    dispatch(vacanciesSlice.actions.vacanciesFetching());

    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};
