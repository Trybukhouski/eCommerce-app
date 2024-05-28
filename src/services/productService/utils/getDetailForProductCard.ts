import { Product } from '@root/services/interfaces';
import { ProductDetailOptions } from '@modules/catalog/components/productCard';

export function getDetailForProductCard(product: Product, locale = 'en-GB'): ProductDetailOptions {
  const responseDetail = product.masterData.current;
  return {
    key: product.key,
    id: product.id,
    titleText: responseDetail.name[locale] || '...',
    descriptionText: responseDetail.description[locale] || '...',
    priceInfo: {
      regularPrice: responseDetail.masterVariant.prices[0]?.value.centAmount || 0,
    },
    urls: {
      mainImage: responseDetail.masterVariant.images[0]?.url || 'error',
    },
  };
}
