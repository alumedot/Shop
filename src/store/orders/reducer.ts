import Order from 'models/order';

import { ActionTypes } from './types/ActionTypes';
import { IAction, IReduxState } from './types/redux';


const initialState: IReduxState = {
  orders: [],
  loading: false,
};

export default (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.AddOrder:
      return {...state, loading: true};
    case ActionTypes.AddOrderSucceed:
      const {id, items, totalAmount, date} = action;
      const newOrder = new Order(id, items, totalAmount, date);
      return {
        ...state,
        orders: state.orders.concat(newOrder),
        loading: false,
      };
    case ActionTypes.GetOrders:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.GetOrdersSucceed:
      return {
        ...state,
        orders: action.orders,
        loading: false,
      }
    default:
      return state;
  }
}
