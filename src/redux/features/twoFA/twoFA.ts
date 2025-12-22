import { baseApi } from "../../api/baseApi";

const TowFactorAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    setUpTwoFA: builder.mutation({
      query: () => ({
        url: `/auth/2fa/setup`,
        method: "POST",
      }),
    }),
  }),
});

export const { useSetUpTwoFAMutation } = TowFactorAuthApi;
