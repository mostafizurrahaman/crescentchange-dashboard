export interface ISignUpFormValues {
  // Step 1: Account
  name: string;
  email: string;
  password: string;

  // Step 2: Organization
  serviceType: string;
  address: string;
  state: string;
  postalCode: string;
  country: string;
  website: string;
  phoneNumber: string;

  // Step 3: Compliance
  tfnOrAbnNumber: string;
  acncNumber: string;
  zakatLicenseHolderNumber?: string;

  // Step 4: Board Member
  boardMemberName: string;
  boardMemberEmail: string;
  boardMemberPhoneNumber: string;
  drivingLicense?: File | null;
}
