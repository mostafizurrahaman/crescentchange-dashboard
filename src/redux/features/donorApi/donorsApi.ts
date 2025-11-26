import { baseApi } from "../../api/baseApi";

const DonorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDonors: builder.query({
      query: ({
        page,
        limit,
        status,
        donationType,
        searchTerm,
        sort,
        organizationId,
      }) => ({
        url: `/donation/organization/${organizationId}?page=${page}&limit=${limit}&status=${status}&donationType=${donationType}&searchTerm=${searchTerm}&sort=${sort}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllDonorsQuery } = DonorsApi;
