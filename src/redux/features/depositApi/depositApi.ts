import { baseApi } from "../../api/baseApi";

const DepositApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDepositStats: builder.query({
      query: () => ({
        url: `/balance/dashboard-stats?donationType=all`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDepositStatsQuery } = DepositApi;
