export interface ProductDetailOptions {
  key: string;
  id: string;
  titleText: string;
  descriptionText: string;
  priceInfo: { regularPrice: number; discontPrice?: number };
  urls: {
    mainImage: string;
  };
  attributes: { name: string; value: string }[];
}
