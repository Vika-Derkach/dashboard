import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const crewAPI = createApi({
  reducerPath: "crewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Crew"],
  endpoints: (build) => ({
    fetchAllCrew: build.query({
      query: ({ page, limit, sort, popularityHigher, job }) => ({
        url: `/crew`,
        params: {
          _page: page,
          _limit: limit,
          _sort: sort,
          _order: "asc",
          popularity_gte: popularityHigher,
          job_like: job,
          // perPage: 5
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
