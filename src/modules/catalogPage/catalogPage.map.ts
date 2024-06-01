import { ProductService } from '@services';
import { Filter, ProductCard } from './components';

export class catalogPageMap {
  protected components = {
    Filter,
    ProductCard,
  };

  protected services = {
    ProductService,
  };
}
