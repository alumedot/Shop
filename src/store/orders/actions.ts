import { ActionTypes } from './types/ActionTypes';
import { IOrderItem } from './types/instance';


export const addOrder = (items: IOrderItem[], totalAmount: number) => {
  return {
    type: ActionTypes.AddOrder,
    orderData: {items, totalAmount},
  }
};

export const getOrders = () => {
  return {type: ActionTypes.GetOrders};
}
