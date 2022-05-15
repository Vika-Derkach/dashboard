import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: `/users`,
      }),
      providesTags: (result) => ["User"],
    }),
  }),
});
