import { clientCredentials } from '@root/config';
import { BackendService, LocalStorageService } from '@services';
import { getHeaders /* handleResponse */ } from '@shared';

class CartService extends BackendService {
  private static cartUrl = `${clientCredentials.apiUrl}/${clientCredentials.projectKey}/carts`;

  private static cartIdUrl = `${this.cartUrl}/customer-id={customerId}`;

  private static errMessCartNotExist = 'An active cart for the customer does not exist';

  public static async getCartById(): Promise<void> {
    const userId = LocalStorageService.getUserId();
    if (userId === null) {
      return;
    }

    const url = this.cartIdUrl.replace(/{customerId}/, userId);
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
