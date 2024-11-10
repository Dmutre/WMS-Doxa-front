import { Product } from './product';

export interface Warehouse {
  id: number;
  name: string;
  location: string;
  items: Product[];
};
