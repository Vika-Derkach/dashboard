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
    deleteCrewMember: build.mutation({
      query: (crewMember) => ({
        url: `/crew/${crewMember.id}`,
        method: "DELETE",
        body: crewMember,
      }),
      invalidatesTags: ["Crew"],
    }),
    updateCrewMember: build.mutation({
      query: (crewMember) => ({
        url: `/crew/${crewMember.id}`,
        method: "PUT",
        body: crewMember,
      }),
      invalidatesTags: ["Crew"],
    }),
  }),
});
