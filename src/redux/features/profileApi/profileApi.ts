import { baseApi } from "../../api/baseApi";

const ProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProfile: builder.query({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllProfileQuery } = ProfileApi;
