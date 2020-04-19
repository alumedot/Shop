import { AxiosError } from 'axios';

import { ActionTypes } from './ActionTypes';
import { IOrder, IOrderItem } from './instance';


export interface IReduxState {
  orders: IOrder[];
  loading: boolean;
}

export interface IAddOrder {
  type: ActionTypes.AddOrder;
  orderData: {
    items: IOrderItem[],
    totalAmount: number,
  };
}

export interface IAddOrderSucceed {
  type: ActionTypes.AddOrderSucceed;
  id: string;
  items: IOrderItem[],
  totalAmount: number,
  date: Date,
}

export interface IAddOrderFailed {
  type: ActionTypes.AddOrderFailed;
  error: AxiosError;
}

export interface IGetOrders {
  type: ActionTypes.GetOrders;
}

export interface IGetOrdersSucceed {
  type: ActionTypes.GetOrdersSucceed;
  orders: IOrder[];
}

export interface IGetOrdersFailed {
  type: ActionTypes.GetOrdersFailed;
  error: AxiosError;
}

export type IAction =
  IAddOrder |
  IAddOrderSucceed |
  IGetOrders |
  IGetOrdersSucceed;
