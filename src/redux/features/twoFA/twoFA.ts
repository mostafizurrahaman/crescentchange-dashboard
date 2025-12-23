import { baseApi } from "../../api/baseApi";

const TowFactorAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setUpTwoFA: builder.mutation({
      query: () => ({
        url: `/auth/2fa/setup`,
        method: "POST",
      }),
    }),
    verifyCodeAndEnavble2FA: builder.mutation({
      query: (data) => ({
        url: `/auth/2fa/enable`,
        method: "POST",
        body: data,
      }),
    }),
    disableTwoFA: builder.mutation({
      query: (data) => ({
        url: `/auth/2fa/disable`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSetUpTwoFAMutation, useVerifyCodeAndEnavble2FAMutation ,useDisableTwoFAMutation } =
  TowFactorAuthApi;
