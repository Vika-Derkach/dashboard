import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CitiesReducer from "../reducers/CitiesSlice";
import VacanciesReducer from "../reducers/VacanciesSlice";
import { userAPI } from "../services/UserService";

const rootReducer = combineReducers({
  VacanciesReducer,

  CitiesReducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(userAPI.middleware),
  });
};
