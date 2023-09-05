import { Role } from "@prisma/client";
import { Order } from "src/orders/entities/order.entity";

export class Item {
  readonly id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
  url: string;
  order?: Order[];
}
