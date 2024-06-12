export interface LoginResponse extends Response {
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
  dateOfBirth?: string;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
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
  dateOfBirth?: string;
}

// product interfaces

export interface Product {
  id: string;
  key: string;
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
  attributes: { name: string; value: string }[];
}

export interface Image {
  url: string;
  dimensions: {
    w: number;
    h: number;
  };
}

export interface Price {
  country: string;
  id: string;
  discounted?: {
    value: {
      centAmount: number;
    };
  };
  value: {
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
}

export interface LoginCustomer {
  addresses: Address[];
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: string;
  stores: Storage[];
}

export interface CustomerSignInResult {
  customer: LoginCustomer;
}

interface WhosModify {
  clientId: string;
  isPlatformClient: boolean;
  customer: {
    id: string;
    typeId: string;
  };
}

export interface LineItem {
  addedAt: string;
  discountedPricePerQuantity: [];
  id: string;
  lastModifiedAt: string;
  lineItemMode: string;
  name: {
    'en-GB': string;
  };
  perMethodTaxRate: [];
  price: Price;
  priceMode: string;
  productId: string;
  productKey: string;
  productSlug: {
    'en-GB': string;
  };
  productType: {
    typeId: string;
    id: string;
    version: number;
  };
  quantity: number;
  state: object[];
  taxedPricePortions: [];
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  variant: MasterVariant;
}

export interface Cart {
  cartState: string;
  createdAt: string;
  createdBy: WhosModify;
  customLineItems: [];
  customerId: string;
  deleteDaysAfterLastModification: number;
  directDiscounts: [];
  discountCodes: [];
  id: string;
  inventoryMode: string;
  itemShippingAddresses: [];
  lastMessageSequenceNumber: number;
  lastModifiedAt: string;
  lastModifiedBy: WhosModify;
  lineItems: LineItem[];
  origin: string;
  refusedGifts: [];
  shipping: [];
  shippingMode: string;
  taxCalculationMode: string;
  taxMode: string;
  taxRoundingMode: string;
  totalPrice: {
    type: string;
    currencyCode: string;
    centAmount: number;
    fractionDigits: number;
  };
  type: string;
  version: number;
  versionModifiedAt: string;
}

export interface Carts {
  count: number;
  limit: number;
  offset: number;
  results: Cart[];
  total: number;
}
