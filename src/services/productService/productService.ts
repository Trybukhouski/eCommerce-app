import { clientCredentials } from '@root/config';
import { handleResponse } from '@shared';
import { getHeaders } from '@root/shared/utils/apiHelpers';
import { Product } from '@root/services/interfaces';

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
    return 'https://via.placeholder.com/150'; // URL изображения-заглушки
  }
}