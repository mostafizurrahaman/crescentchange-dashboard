import { baseApi } from "../../api/baseApi";

const IntregrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addBankAccount: builder.mutation({
      query: () => ({
        url: "/organization/stripe-connect/onboard",
        method: "POST",
      }),
    }),

    getStripeAccountStatus: builder.query({
      query: () => ({
        url: "/organization/stripe-connect/status",
        method: "GET",
      }),
    }),
  }),
});

export const { useAddBankAccountMutation, useGetStripeAccountStatusQuery } =
  IntregrationApi;
