import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CitiesReducer from "../reducers/CitiesSlice";
import UsersReducer from "../reducers/UsersSlice";
import VacanciesReducer from "../reducers/VacanciesSlice";

const rootReducer = combineReducers({
  VacanciesReducer,

  CitiesReducer,
  UsersReducer,
  //   [postAPI.reducerPath]: postAPI.reducer,
});

// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(postAPI.middleware),
//   });
// };

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
