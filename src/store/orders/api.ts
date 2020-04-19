import axios from 'axios';

import { url } from 'config';
import { IOrderItem } from './types/instance';

export default {
  async addOrder(items: IOrderItem[], totalAmount: number, date: string) {
    return await axios.post(url + 'orders/u1.json', {
      items,
      totalAmount,
      date,
    });
  },

  async getOrders() {
    return await axios.get(url + 'orders/u1.json');
  },
};
