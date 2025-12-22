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
  }),
});

export const {
  useSignUpApiMutation,
  useLoginApiMutation,
  useBoardMessageApiQuery,
  useChnageBoardMemebrStatusApiMutation,
  useSignUpMutation,
  useVerifyOtpMutation,
  useGetNotificationQuery,
  useNotificationMarkASReadMutation
} = AuthApi;
