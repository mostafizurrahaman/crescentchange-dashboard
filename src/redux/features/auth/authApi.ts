import { baseApi } from "../../api/baseApi";

const AuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUpApi: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/auth/signin",
        method: "POST",
        body: data,
      }),
    }),

    boardMessageApi: builder.query({
      query: () => ({
        url: "/board-member",
        method: "GET",
      }),
    }),
    chnageBoardMemebrStatusApi: builder.mutation({
      query: ({ data, _id }) => ({
        url: `/board-member/${_id}/status`,
        method: "POST",
        body: data,
      }),
    }),

    // sign Up:
    SignUp: builder.mutation({
      query: (data) => ({
        url: "/auth/organization-signup",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-signup-otp",
        method: "POST",
        body: data,
      }),
    }),
    resendSignUpOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-signup-otp-again",
        method: "POST",
        body: data,
      }),
    }),
    chnagePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-forgot-password-otp",
        method: "POST",
        body: data,
      }),
    }),
    resendForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/send-forgot-password-otp-again",
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Notification
    getNotification: builder.query({
      query: () => ({
        url: "/notification/me",
        method: "GET",
      }),
    }),
    notificationMarkASRead: builder.mutation({
      query: (_id) => ({
        url: `/notification/mark-notification/${_id}`,
        method: "PATCH",
      }),
    }),

    getUnreadNotification: builder.query({
      query: () => ({
        url: "/notification/unseen-notification-count",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),
    getAllCountries: builder.query({
      query: () => ({
        url: "/organization/supported-countries",
        method: "GET",
      }),
      providesTags: ["allowed-countries"],
    }),
  }),
});

export const {
  useSignUpApiMutation,
  useLoginApiMutation,
  useBoardMessageApiQuery,
  useChnageBoardMemebrStatusApiMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
  useChnagePasswordMutation,
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
  useResendForgotPasswordOtpMutation,
  useResetPasswordMutation,
  useGetNotificationQuery,
  useNotificationMarkASReadMutation,
  useGetUnreadNotificationQuery,
  useResendSignUpOtpMutation,
  useGetAllCountriesQuery,
} = AuthApi;
