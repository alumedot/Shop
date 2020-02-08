import { IOrderItem } from 'store/orders/types/instance';


class Order {
    id: string;
    items: IOrderItem[];
    totalAmount: number;
    date: Date;

    constructor(id: string, items: IOrderItem[], totalAmount: number, date: Date) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}

export default Order;
