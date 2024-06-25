import { ProductService } from '@services';
import { Filter, Pagination, ProductCard, SortWidget } from './components';

export class catalogPageMap {
  protected components = {
    filter: new Filter(),
    ProductCard,
    sortWidget: new SortWidget(),
    pagination: new Pagination(),
  };

  protected services = {
    ProductService,
  };
}
