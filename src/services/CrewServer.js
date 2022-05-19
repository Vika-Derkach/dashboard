import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const crewAPI = createApi({
  reducerPath: "crewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Crew"],
  endpoints: (build) => ({
    fetchAllCrew: build.query({
      query: (limit) => ({
        url: `/crew`,
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Crew"],
    }),
    createCrewMember: build.mutation({
      query: (crewMember) => ({
        url: `/crew`,
        method: "POST",
        body: crewMember,
      }),
      invalidatesTags: ["Crew"],
    }),
  }),
});