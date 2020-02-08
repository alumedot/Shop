import { ActionTypes } from './ActionTypes';
import { IOrder, IOrderItem } from './instance';


export interface IReduxState {
    orders: IOrder[];
}

export interface IAddOrder {
    type: ActionTypes.AddOrder;
    orderData: {
        items: IOrderItem[],
        amount: number,
    };
}

export type IAction = IAddOrder;
