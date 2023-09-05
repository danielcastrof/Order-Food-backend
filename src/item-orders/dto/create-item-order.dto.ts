import { ItemOrder } from "../entities/item-order.entity"

export class CreateItemOrderDto extends ItemOrder {
  orderId: string
  itemId: string
  quantity: number
  subtotal: number
} 
