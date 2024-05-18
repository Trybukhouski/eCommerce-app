export interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface Customer {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: ModifiedBy;
  createdBy: ModifiedBy;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses?: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  // stores: Store[];
  authenticationMode: string;
}

export interface ModifiedBy {
  clientId: string;
  isPlatformClient: boolean;
  customer: CustomerReference;
}

export interface CustomerReference {
  typeId: string;
  id: string;
}

export interface Address {
  id: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  additionalAddressInfo: string;
}

// export interface Store { }

export interface RegistrationResponse {
  customer: Customer;
}
