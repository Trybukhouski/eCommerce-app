import { clientCredentials } from '@root/config';
import { handleResponse } from '@shared';
import { getHeaders } from '@root/shared/utils/apiHelpers';
import { Product } from '@root/services/interfaces';
import placeholderImage from '@assets/images/placeholderImage.jpg';

export class ProductService {
  private static baseUrl = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/products`;

  public static async getProductByKey(key: string): Promise<Product> {
    const url = `${this.baseUrl}/key=${key}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch product by key: ${errorText}`);
    }

    return handleResponse(response);
  }

  public static async getProductById(id: string): Promise<Product> {
    const url = `${this.baseUrl}/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch product by ID: ${errorText}`);
    }

    return handleResponse(response);
  }

  public static async getProductImagesById(id: string): Promise<string[]> {
    try {
      const product = await this.getProductById(id);
      const images = product.masterData.current.masterVariant.images.map((img) => img.url);
      return images.length > 0 ? images : [this.getPlaceholderImage()];
    } catch (error) {
      // console.error('Error fetching product images by ID:', error);
      return [this.getPlaceholderImage()];
    }
  }

  public static async getProductImagesByKey(key: string): Promise<string[]> {
    try {
      const product = await this.getProductByKey(key);
      const images = product.masterData.current.masterVariant.images.map((img) => img.url);
      return images.length > 0 ? images : [this.getPlaceholderImage()];
    } catch (error) {
      // console.error('Error fetching product images by key:', error);
      return [this.getPlaceholderImage()];
    }
  }

  private static getPlaceholderImage(): string {
    return placeholderImage;
  }

  public static async getProducts(): Promise<Product[]> {
    const url = `${this.baseUrl}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch products: ${errorText}`);
    }

    const data = await handleResponse(response);
    return data.results;
  }

  public static async getProductList(): Promise<
    { name: string; image: string; description: string }[]
  > {
    const products = await this.getProducts();
    return products.map((product) => ({
      name: product.masterData.current.name?.['en'] || 'No Name',
      image: product.masterData.current.masterVariant.images[0]?.url || this.getPlaceholderImage(),
      description: product.masterData.current.description?.['en'] || 'No Description',
    }));
  }

  public static async getProductAttributes(): Promise<any> {
    const url = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/product-projections/attributes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch product attributes: ${errorText}`);
    }

    return handleResponse(response);
  }

  public static async getFilteredProducts(filters: Record<string, string>): Promise<Product[]> {
    const filterParams = Object.keys(filters)
      .map((key) => {
        const value = filters[key];
        if (value === undefined || value === null) {
          return '';
        }
        // обработка значения перед добавлением в строку параметров
        return `where=${key}="${encodeURIComponent(value)}"`;
      })
      // фильтрация пустых строк
      .filter((param) => param)
      .join('&');

    const url = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/product-projections?${filterParams}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch filtered products: ${errorText}`);
    }

    const data = await handleResponse(response);
    return data.results;
  }

  public static async getSortedProducts(
    sortBy: string,
    sortDirection: 'asc' | 'desc'
  ): Promise<Product[]> {
    const sortParam = `sort=${sortBy} ${sortDirection}`;
    const url = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/product-projections?${sortParam}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch sorted products: ${errorText}`);
    }

    const data = await handleResponse(response);
    return data.results;
  }

  public static async searchProducts(query: string): Promise<Product[]> {
    const encodedQuery = encodeURIComponent(query);
    const url = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/product-projections/search?text.en=${encodedQuery}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to search products: ${errorText}`);
    }

    const data = await handleResponse(response);
    return data.results;
  }
}
