import { Item } from "src/items/entities/item.entity";

export class Order {
  readonly id?: string;
  name: string;
  total: number;
  qtd: number;
  status: boolean;
  finished: boolean;
  author: string;
  items: Item[];
  obs: string;
}
