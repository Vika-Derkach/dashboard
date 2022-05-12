import axios from "axios";
import { vacanciesSlice } from "../reducers/VacanciesSlice";

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
