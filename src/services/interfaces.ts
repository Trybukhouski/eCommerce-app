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
  id?: string;
  key?: string;
  streetName?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  additionalAddressInfo?: string;
}

export interface UserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  birthDate?: string;
  addresses: {
    key?: string;
    country?: string;
    city?: string;
    streetName?: string;
    postalCode?: string;
  }[];
}

// export interface Store { }

export interface RegistrationResponse {
  customer: Customer;
}

export interface AddressAction {
  action: string;
  addressId?: string;
  addressKey?: string;
}

// product interfaces

export interface Product {
  id: string;
  version: number;
  masterData: MasterData;
}

export interface MasterData {
  current: CurrentData;
}

export interface CurrentData {
  name: LocalizedString;
  description: LocalizedString;
  masterVariant: MasterVariant;
}

export interface LocalizedString {
  [locale: string]: string;
}

export interface MasterVariant {
  id: number;
  sku: string;
  images: Image[];
  prices: Price[];
}

export interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface Price {
  id: string;
  value: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}
