import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { message } from "antd";
import { BASE_URL } from "../utils/baseUrl";

interface ApiError {
  message: string;
}
const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}`,
  // credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    // const token = (getState() as RootState).auth.token;
    // console.log("Token being sent:", token);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const error = result.error as FetchBaseQueryError;

    if ("status" in error) {
      const status = error.status;

      if (status === 400 || status === 403 || status === 404) {
        const data = error?.data as ApiError;
        message.error(data?.message);
      }
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["notification", "subscription"],
  endpoints: () => ({}),
});
