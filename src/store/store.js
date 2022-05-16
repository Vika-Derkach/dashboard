import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CitiesReducer from "../reducers/CitiesSlice";
import VacanciesReducer from "../reducers/VacanciesSlice";
import { postAPI } from "../services/PostsService";
import { stockAPI } from "../services/StockServer";
import { userAPI } from "../services/UserService";

const rootReducer = combineReducers({
  VacanciesReducer,

  CitiesReducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [postAPI.reducerPath]: postAPI.reducer,
  [stockAPI.reducerPath]: stockAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        userAPI.middleware,
        postAPI.middleware,
        stockAPI.middleware
      ),
  });
};
