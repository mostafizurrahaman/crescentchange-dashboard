import { baseApi } from "../../api/baseApi";

export type PlanType = "monthly" | "yearly";

export interface SubscriptionMeResponse {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
    user: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    currentPeriodEnd: string;
    currentPeriodStart: string;
    planType: string;
    status: string;
    stripeCustomerId: string;
    stripePriceId: string;
    stripeSubscriptionId: string;
    updatedAt: string;
  };
}

export interface CreateSessionRequest {
  planType: PlanType;
}

export interface CreateSessionResponse {
  success?: boolean;
  message?: string;
  data?: {
    url?: string;
  };
  url?: string;
}

const SubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionMe: builder.query<SubscriptionMeResponse, void>({
      query: () => ({
        url: "/subscription/me",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),

    createSubscriptionSession: builder.mutation<CreateSessionResponse, CreateSessionRequest>({
      query: (body) => ({
        url: "/subscription/create-session",
        method: "POST",
        body,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetSubscriptionMeQuery,
  useCreateSubscriptionSessionMutation,
} = SubscriptionApi;
