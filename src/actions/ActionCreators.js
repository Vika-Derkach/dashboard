import axios from "axios";
import { vacanciesSlice } from "../reducers/VacanciesSlice";
import { vacancySlice } from "../reducers/VacancySlice";

// export const fetchVacancies = createAsyncThunk(
//   "vacancies/fetchAll",
//   async (_, thunkAPI) => {
//     try {
//       const response = await axios.get("http://localhost:3001/vacancies");
//       console.log("response11", response);
//       return response.data;
//     } catch (e) {
//       return thunkAPI.rejectWithValue("Inposible to load vacancies");
//     }
//   }
// );
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
    console.log(vacancy, "vacancy action");
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
