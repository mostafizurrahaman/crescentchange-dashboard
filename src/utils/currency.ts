export const PLATFORM_BASE_CURRENCY = "USD";

export type CurrencyDisplay = {
  organizationCurrency: string;
  currencySymbol: string;
  stripeCurrency: string;
  amountLabel: string;
};

export type CurrencySource = {
  organizationCurrency?: string | null;
  currencySymbol?: string | null;
  stripeCurrency?: string | null;
  amountLabel?: string | null;
  currency?: string | null;
  defaultCurrency?: string | null;
};

export const normalizeCurrency = (currency?: string | null): string =>
  (currency || PLATFORM_BASE_CURRENCY).trim().toUpperCase();

export const currencySymbol = (currency?: string | null): string => {
  const code = normalizeCurrency(currency);
  try {
    const part = new Intl.NumberFormat("en", {
      style: "currency",
      currency: code,
      currencyDisplay: "narrowSymbol",
    })
      .formatToParts(0)
      .find((p) => p.type === "currency");
    return part?.value ?? code;
  } catch {
    return code;
  }
};

export const buildCurrencyDisplay = (
  currency?: string | null,
): CurrencyDisplay => {
  const organizationCurrency = normalizeCurrency(currency);
  return {
    organizationCurrency,
    currencySymbol: currencySymbol(organizationCurrency),
    stripeCurrency: organizationCurrency.toLowerCase(),
    amountLabel: organizationCurrency,
  };
};

export const resolveCurrencyDisplay = (
  ...sources: Array<CurrencySource | string | null | undefined>
): CurrencyDisplay => {
  for (const source of sources) {
    if (!source) continue;
    if (typeof source === "string") {
      return buildCurrencyDisplay(source);
    }

    const code =
      source.organizationCurrency ||
      source.currency ||
      source.defaultCurrency;

    if (code || source.currencySymbol) {
      const display = buildCurrencyDisplay(code);
      return {
        organizationCurrency: display.organizationCurrency,
        currencySymbol: source.currencySymbol || display.currencySymbol,
        stripeCurrency: source.stripeCurrency || display.stripeCurrency,
        amountLabel: source.amountLabel || display.amountLabel,
      };
    }
  }

  return buildCurrencyDisplay();
};

export const formatMoney = (
  amount: number | string | null | undefined,
  source?: CurrencySource | string | null,
  options?: { decimals?: number },
): string => {
  const value = Number(amount);
  const safe = Number.isFinite(value) ? value : 0;
  const decimals = options?.decimals ?? 2;
  const display =
    typeof source === "string" || source == null
      ? resolveCurrencyDisplay(source)
      : resolveCurrencyDisplay(source);

  return `${display.organizationCurrency} ${safe.toFixed(decimals)}`;
};

export const currencyPrefix = (
  source?: CurrencySource | string | null,
): string => resolveCurrencyDisplay(source).organizationCurrency;

export const getDonationRows = (response: {
  data?: unknown;
} | null): CurrencySource[] => {
  const payload = response?.data as
    | CurrencySource[]
    | { donations?: CurrencySource[] }
    | undefined;

  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.donations)) return payload.donations;
  return [];
};

export const getResponseCurrency = (
  response: { data?: CurrencySource } | null,
  fallback?: CurrencySource | null,
): CurrencyDisplay => resolveCurrencyDisplay(response?.data, fallback);
