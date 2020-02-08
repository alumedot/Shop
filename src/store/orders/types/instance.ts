export interface IOrderItem {
    id: string;
    title: string;
    price: number;
    quantity: number;
    sum: number;
}

export interface IOrder {
    id: string;
    items: IOrderItem[];
    totalAmount: number;
    date: Date;
    readableDate: string;
}
