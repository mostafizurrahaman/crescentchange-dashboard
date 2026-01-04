import { baseApi } from "../../api/baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonationStats: builder.query({
      query: ({ filter, donationType }) => ({
        // url: `/donation/analytics/stats?filter=${filter}`,
        url: `/donation/analytics/stats?filter=${filter}&donationType=${donationType}`,
        method: "GET",
      }),
    }),
    getTrends: builder.query({
      query: (year) => ({
        url: `/donation/analytics/yearly-trends?year=${year}`,
        method: "GET",
      }),
    }),
    resendReceipt: builder.mutation({
      query: (receiptId: string) => ({
        url: `/receipt/${receiptId}/resend-email`,
        method: "POST",
      }),
    }),
  }),

});

export const { useGetDonationStatsQuery, useGetTrendsQuery, useResendReceiptMutation  } = DashboardApi;
