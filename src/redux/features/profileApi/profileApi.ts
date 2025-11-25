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
  }),
});

export const {
  useGetAllProfileQuery,
  useGetCauseStatsQuery,
  useGetRaisedCausedQuery,
} = ProfileApi;
