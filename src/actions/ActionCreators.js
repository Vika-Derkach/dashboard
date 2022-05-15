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
      console.error(e);
      return thunkAPI.rejectWithValue("Inposible to load cities");
    }
  }
);

// not used because there is vacancyModifiy which do upadete and create acording to the condition
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
    console.log(cityInfo, cityInfo.data);
    vacancy.city = cityInfo?.data[0].id;
    await axios.post("http://localhost:3001/vacancy", {
      vacancy,
    });
    const response = await axios.get("http://localhost:3001/vacancies");

    dispatch(vacanciesSlice.actions.vacanciesFetching());

    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

// not used because there is vacancyModifiy which do upadete and create acording to the condition
export const updateVacancy = (vacancy) => async (dispatch) => {
  try {
    console.log(vacancy, "vacancy put");
    await axios.put(
      `http://localhost:3001/vacancy/${vacancy.id}`,
      {
        vacancy,
      }
      // {
      //   headers: {
      //     "Content-Type": `application/json `,
      //     // Authorization:
      //     //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJmZHNmcyI6ImZzZGZzZCJ9.6-hrKvHcmdAlpJD8U9ivQGNoAqok-7pb-wsyDsGeVR4",
      //   },
      // }
    );
    const response = await axios.get("http://localhost:3001/vacancies");
    dispatch(vacanciesSlice.actions.vacanciesFetching());
    console.log(response.data, "responce.data");
    dispatch(vacanciesSlice.actions.vacanciesFetchingSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

export const getCity = async (vacancy) => {
  const cityName = vacancy.city;
  const cityInfo = await axios.get(
    `http://localhost:3001/cities?search=${cityName}`
  );

  return cityInfo?.data[0].id;
};

export const getPrice = (vacancy) => {
  if (vacancy.priceFromTo && vacancy.priceFromTo.to) {
    vacancy.price = vacancy.priceFromTo;
  } else if (vacancy.priceOne) {
    vacancy.price = vacancy.priceOne;
  } else {
    vacancy.price = vacancy.priceEmtpy;
  }

  return vacancy.price;
};

export const fetchAll = async (dispatch) => {
  const response = await axios.get("http://localhost:3001/vacancies");

  dispatch(vacanciesSlice.actions.vacanciesFetching());

  return dispatch(
    vacanciesSlice.actions.vacanciesFetchingSuccess(response.data)
  );
};

export const fetchVacancies = () => async (dispatch) => {
  try {
    // const getCities = await axios.get("http://localhost:3001/cities");
    // let obj = getCities.data.find((o) => o.id === "38");
    // console.log(obj, "getCities");

    await fetchAll(dispatch);
  } catch (e) {
    console.error(e);
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};

export const vacancyModifiy =
  (vacancy, isUpdate = false) =>
  async (dispatch) => {
    try {
      vacancy.price = getPrice(vacancy);

      dispatch(vacanciesSlice.actions.vacanciesUpdate(vacancy));

      if (isUpdate) {
        await axios.put(`http://localhost:3001/vacancy/${vacancy.id}`, {
          vacancy,
        });
      } else {
        await axios.post("http://localhost:3001/vacancy", {
          vacancy,
        });
      }
      await fetchAll(dispatch);
    } catch (e) {
      console.error(e);
      dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
    }
  };

export const deleteVacancy = (vacancy) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:3001/vacancy/${vacancy.id}`,
      {
        vacancy,
      },
      {
        headers: { "Content-Type": `Bearer ${JSON.stringify(vacancy)}` },
      }
    );

    await fetchAll(dispatch);
  } catch (e) {
    console.error(e);
    dispatch(vacanciesSlice.actions.vacanciesFetchingError(e.message));
  }
};
