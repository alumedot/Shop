import { ActionTypes } from './types/ActionTypes';
import { IOrderItem } from './types/instance';


export const addOrder = (items: IOrderItem[], amount: number) => {
    return {
        type: ActionTypes.AddOrder,
        orderData: { items, amount },
    }
};
