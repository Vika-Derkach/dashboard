import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const stockAPI = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://alpha-vantage.p.rapidapi.com",
  }),
  tagTypes: ["Stock"],
  endpoints: (build) => ({
    fetchAllStocks: build.query({
      query: (symbolStoke) => ({
        url: `/query`,
        params: {
          symbol: symbolStoke,
          function: "TIME_SERIES_MONTHLY_ADJUSTED",
          datatype: "json",
        },
        headers: {
          "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
          "X-RapidAPI-Key":
            "86ff17ecf1mshc5fb51e37f45f5ap1ae8bejsn5cb4d0ad6281",
        },
      }),
      providesTags: (result) => ["Stock"],
    }),
  }),
});
