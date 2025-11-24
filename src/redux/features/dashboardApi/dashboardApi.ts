import { baseApi } from "../../api/baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonationStats: builder.query({
      query: ({ filter }) => ({
        url: `/donation/analytics/stats?filter=${filter}`,
        method: "GET",
      }),
    }),
    getTrends: builder.query({
      query: ({ year }) => ({
        url: `/donation/analytics/yearly-trends?year=${year}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDonationStatsQuery, useGetTrendsQuery } = DashboardApi;
