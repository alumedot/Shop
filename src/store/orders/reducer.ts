import Order from 'models/order';

import { ActionTypes } from './types/ActionTypes';
import { IAction } from './types/redux';
import { IReduxState } from './types/redux';


const initialState: IReduxState = {
    orders: [],
};

export default (state = initialState, action: IAction) => {
    switch (action.type) {
        case ActionTypes.AddOrder:
            const { items, amount } = action.orderData;
            const newOrder = new Order(new Date().toString(), items, amount, new Date());
            return {
                ...state,
                orders: state.orders.concat(newOrder),
            };
        default:
            return state;
    }
    return state;
}
