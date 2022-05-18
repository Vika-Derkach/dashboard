import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const populationAPI = createApi({
  reducerPath: "populationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://datausa.io/api",
  }),
  tagTypes: ["Population"],
  endpoints: (build) => ({
    fetchAllPopulation: build.query({
      query: (limit) => ({
        url: `/data`,
        params: {
          measures: "Population",
          drilldowns: "Nation",
        },
      }),
      providesTags: (result) => ["Population"],
    }),
  }),
});
