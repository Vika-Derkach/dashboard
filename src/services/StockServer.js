import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const stockAPI = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://alpha-vantage.p.rapidapi.com",
  }),
  tagTypes: ["Stock"],
  endpoints: (build) => ({
    fetchAllStocks: build.query({
      query: ({ symbolStoke, timeSeties }) => ({
        url: `/query`,
        params: {
          symbol: symbolStoke,
          function: timeSeties,
          datatype: "json",
        },
        headers: {
          "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
          "X-RapidAPI-Key":
            "63be799c6fmsha1dc403a238adbbp1c9ad0jsn750e16e43512",
        },
      }),
      providesTags: (result) => ["Stock"],
    }),
  }),
});
