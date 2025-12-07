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
    createCause: builder.mutation({
      query: (data) => ({
        url: "/cause",
        method: "POST",
        body: data,
      }),
    }),

    updateCause: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/cause/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCause: builder.mutation({
      query: (_id) => ({
        url: `/cause/${_id}`,
        method: "DELETE",
      }),
    }),
    getAllCauses: builder.query({
      query: (orgId) => ({
        url: `/cause/organization/${orgId}`,
        method: "GET",
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
  useCreateCauseMutation,
  useUpdateCauseMutation,
  useDeleteCauseMutation,
  useGetAllCausesQuery
} = ProfileApi;
