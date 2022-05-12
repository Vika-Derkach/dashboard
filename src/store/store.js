import { combineReducers, configureStore } from "@reduxjs/toolkit";
import VacanciesReducer from "../reducers/VacanciesSlice";
import VacancyReducer from "../reducers/VacancySlice";
const rootReducer = combineReducers({
  VacanciesReducer,
  VacancyReducer,
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
