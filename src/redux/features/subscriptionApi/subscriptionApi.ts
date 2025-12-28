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

export interface BillingHistoryItem {
  _id: string;
  user: string;
  subscription: string;
  stripeInvoiceId: string;
  stripePaymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  billingReason: string;
  planType: string;
  invoiceUrl: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillingHistoryResponse {
  success: boolean;
  message?: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: BillingHistoryItem[];
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

    getBillingHistory: builder.query<BillingHistoryResponse, void>({
      query: () => ({
        url: "/subscription-history/billing-history",
        method: "GET",
      }),
      providesTags: ["billingHistory"],
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
  useGetBillingHistoryQuery,
  useCreateSubscriptionSessionMutation,
} = SubscriptionApi;
