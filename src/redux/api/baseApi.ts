import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../utils/baseUrl";
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
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    localStorage.removeItem("token");
    if (!window.location.pathname.includes("/auth/login")) {
      window.location.href = "/auth/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "notification",
    "subscription",
    "billingHistory",
    "allowed-countries",
  ],
  endpoints: () => ({}),
});
