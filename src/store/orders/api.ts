import axios from 'axios';

import { url } from 'config';
import { IOrderItem } from './types/instance';

export default {
  async addOrder(token: string, userId: string, items: IOrderItem[], totalAmount: number, date: string) {
    return await axios.post(`${url}orders/${userId}.json?auth=${token}`, {
      items,
      totalAmount,
      date,
    });
  },

  async getOrders(userId: string) {
    return await axios.get(`${url}orders/${userId}.json`);
  },
};
