import { IOrder } from 'store/orders/types/instance';

export interface IAddOrderSucceed {
  name: string;
}

export interface IGetOrdersSucceed {
  [key:string]: IOrder;
}
