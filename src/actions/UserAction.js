import axios from "axios";
import { usersSlice } from "../reducers/UsersSlice";

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(usersSlice.actions.userFetching());
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    console.log(response);
    dispatch(usersSlice.actions.userFetchingSuccess(response.data));
  } catch (e) {
    console.error(e);
    dispatch(usersSlice.actions.userFetchingError(e.message));
  }
};
