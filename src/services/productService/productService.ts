import { clientCredentials } from '@root/config';
import { handleProductImages, handleResponse } from '@shared';
import { Product } from '@root/services/interfaces';
import { getHeaders } from '@root/shared/utils/apiHelpers';

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
    return handleProductImages(() => this.getProductById(id));
  }

  public static async getProductImagesByKey(key: string): Promise<string[]> {
    return handleProductImages(() => this.getProductByKey(key));
  }
}
