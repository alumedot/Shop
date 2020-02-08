import moment from 'moment';

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

    get readableDate() {
        // return this.date.toLocaleDateString('en-En', {
        //     year: 'numeric',
        //     month: 'long',
        //     day: 'numeric',
        //     hour: '2-digit',
        //     minute: '2-digit',
        // });
        return moment(this.date).format('MMM Do YYYY, hh:mm')
    }
}

export default Order;
