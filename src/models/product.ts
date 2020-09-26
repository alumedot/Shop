export class Product {
  id: string;
  ownerId: string;
  ownerPushToken: string;
  imageUrl: string;
  title: string;
  description: string;
  price: number;

  constructor(
    id: string,
    ownerId: string,
    ownerPushToken: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.ownerPushToken = ownerPushToken;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}
