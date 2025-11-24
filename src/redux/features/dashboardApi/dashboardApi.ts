import { baseApi } from "../../api/baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonationStats: builder.query({
      query: ({ filter }) => ({
        url: `/donation/analytics/stats?filter=${filter}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDonationStatsQuery } = DashboardApi;
