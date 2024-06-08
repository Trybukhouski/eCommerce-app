import { clientCredentials } from '@root/config';
import { BackendService } from '@services';
import { getHeaders /* handleResponse */ } from '@shared';

class CartService extends BackendService {
  private static cartUrl = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/me/carts`;

  private static cartIdUrl = `${this.cartUrl}/customer-id={customerId}`;

  private static errMessCartNotExist = 'An active cart for the customer does not exist';

  public static async checkIsCartExist(): Promise<Response | undefined> {
    const url = this.cartUrl;
    const response = fetch(url, {
      method: 'HEAD',
      headers: getHeaders(),
    });

    return response;

    // console.log((await response).body);

    // return handleResponse(response);
  }

  public static async getCartById(): Promise<void> {
    const url = this.cartIdUrl;
    const response = fetch(url, {
      method: 'GET',
      headers: getHeaders(),
    });

    response
      .then((resp) => resp.json())
      .then((json) => {
        if (!json.ok) {
          const errMess = json.message;
          const regularStr = this.errMessCartNotExist.split(' ').slice(0, 6).join(' ');
          const errText =
            typeof errMess === 'string' && errMess.startsWith(regularStr)
              ? this.errMessCartNotExist
              : errMess;
          throw new Error(errText);
        }
        return json;
      })
      .catch((err) => {
        if (err.message !== this.errMessCartNotExist) {
          throw err;
        }
        this.createCartForId(/* userId */);
      });

    // return handleResponse(response);
  }

  private static async createCartForId(/* userId: string */): Promise<void> {}
}

export { CartService };
