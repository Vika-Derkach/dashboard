import { combineReducers, configureStore } from "@reduxjs/toolkit";
import VacanciesReducer from "../reducers/VacanciesSlice";

const rootReducer = combineReducers({
  VacanciesReducer,
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
