import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const postAPI = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: (limit) => ({
        url: `/posts`,
        // params: {
        //   _limit: limit,
        // },
      }),
      providesTags: (result) => ["Post"],
    }),
  }),
});
