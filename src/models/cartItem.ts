class CartItem {
  quantity: number;
  price: number;
  title: string;
  sum: number;
  ownerPushToken: string;

  constructor(quantity: number, price: number, title: string, ownerPushToken: string, sum: number) {
    this.quantity = quantity;
    this.price = price;
    this.title = title;
    this.ownerPushToken = ownerPushToken;
    this.sum = sum;
  }
}

export default CartItem;
