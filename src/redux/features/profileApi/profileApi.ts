import { baseApi } from "../../api/baseApi";

const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
    getCauseStats: builder.query({
      query: ({ orgId, causeId, year }) => ({
        url: `/donation/organization/${orgId}/cause-stats?year=${year}&causeId=${causeId}`,

        method: "GET",
      }),
    }),
    getRaisedCaused: builder.query({
      query: ({ orgId, startDate, endDate, page, limit }) => ({
        url: `/cause/organization/${orgId}/raised-causes?startMonth=${startDate}&endMonth=${endDate}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),

    //  Edit profile:
    editOrgDetails: builder.mutation({
      query: (data) => ({
        url: "/organization/profile-details",
        method: "PATCH",
        body: data,
      }),
    }),
    editTaxDetails: builder.mutation({
      query: (data) => ({
        url: "/organization/tax-details",
        method: "PATCH",
        body: data,
      }),
    }),
    editOrgLogo: builder.mutation({
      query: (data) => ({
        url: "/organization/logo-image",
        method: "PATCH",
        body: data,
      }),
    }),
    editOrgCoverImage: builder.mutation({
      query: (data) => ({
        url: "/auth/update-photo",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllProfileQuery,
  useGetCauseStatsQuery,
  useGetRaisedCausedQuery,
  useEditOrgDetailsMutation,
  useEditOrgCoverImageMutation,
  useEditOrgLogoMutation,
  useEditTaxDetailsMutation,
} = ProfileApi;
