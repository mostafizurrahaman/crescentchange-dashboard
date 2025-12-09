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
  }),
});

export const { useGetDepositStatsQuery, useGetOrgAllDepositsQuery } =
  DepositApi;
