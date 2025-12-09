import { baseApi } from "../../api/baseApi";

const DepositApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepositStats: builder.query({
      query: () => ({
        url: `/balance/dashboard-stats?donationType=all`,
        method: "GET",
      }),
    }),

    getOrgAllDeposits: builder.query({
      query: ({ status, payoutMethod, searchTerm, sort, page, limit }) => ({
        url: `/payout?status=${status}&payoutMethod=${payoutMethod}&searchTerm=${searchTerm}&sort=${sort}&page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
    getMyBalance: builder.query({
      query: () => ({
        url: `/balance`,
        method: "GET",
      }),
    }),
    payoutRequest: builder.mutation({
      query: (data) => ({
        url: `/payout/request`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetDepositStatsQuery,
  useGetOrgAllDepositsQuery,
  useGetMyBalanceQuery,
  usePayoutRequestMutation,
} = DepositApi;
