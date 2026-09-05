import { useGetAllCountriesQuery } from "../redux/features/auth/authApi";
import { useGetAllProfileQuery } from "../redux/features/profileApi/profileApi";
import {
  resolveCurrencyDisplay,
  type CurrencyDisplay,
} from "../utils/currency";

const currencyFromCountry = (
  country?: string | null,
  countries: Array<{ countryCode?: string; name?: string; currency?: string }> = [],
): string | undefined => {
  if (!country) return undefined;
  const key = country.trim().toUpperCase();
  return countries.find(
    (item) =>
      item.countryCode?.toUpperCase() === key ||
      item.name?.toUpperCase() === key,
  )?.currency;
};

export const useOrganizationCurrency = (): CurrencyDisplay => {
  const { data: profileData } = useGetAllProfileQuery(null);
  const { data: countriesData } = useGetAllCountriesQuery({});
  const profile = profileData?.data;
  const fromCountry = currencyFromCountry(
    profile?.country,
    countriesData?.data,
  );

  return resolveCurrencyDisplay(
    fromCountry,
    profile?.organizationCurrency,
    profile?.defaultCurrency,
    profile,
  );
};
