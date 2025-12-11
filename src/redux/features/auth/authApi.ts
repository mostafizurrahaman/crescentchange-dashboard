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
  }),
});

export const {
  useSignUpApiMutation,
  useLoginApiMutation,
  useBoardMessageApiQuery,
  useChnageBoardMemebrStatusApiMutation,
} = AuthApi;
