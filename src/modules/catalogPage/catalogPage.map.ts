import { ProductService } from '@services';
import { Filter, ProductCard, SortWidget } from './components';

export class catalogPageMap {
  protected components = {
    filter: new Filter(),
    ProductCard,
    sortWidget: new SortWidget(),
  };

  protected services = {
    ProductService,
  };
}
