import { Product } from '@services';
import { ProductDetailOptions } from '@root/services/productService';
import errorImage from '@assets/images/errorImage.png';

export function getDetailForProductCard(product: Product, locale = 'en-GB'): ProductDetailOptions {
  const responseDetail = product.masterData.current;
  const discontPrice = responseDetail.masterVariant.prices[0]?.discounted?.value.centAmount;
  return {
    key: product.key,
    id: product.id,
    titleText: responseDetail.name[locale] || '...',
    descriptionText: responseDetail.description[locale] || '...',
    priceInfo: {
      regularPrice: (responseDetail.masterVariant.prices[0]?.value.centAmount || 0) / 100,
      ...(discontPrice !== undefined && { discontPrice: discontPrice / 100 }),
    },
    urls: {
      mainImage: responseDetail.masterVariant.images[0]?.url || errorImage,
    },
  };
}
