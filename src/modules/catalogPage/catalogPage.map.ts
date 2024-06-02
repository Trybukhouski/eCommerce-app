import { ProductService } from '@services';
import { Filter, ProductCard, SortWidget } from './components';

export class catalogPageMap {
  protected components = {
    Filter,
    ProductCard,
    SortWidget,
  };

  protected services = {
    ProductService,
  };
}
