import { IReduxState as IProductsReduxState } from './products/types/redux';
import { IReduxState as ICartReduxState } from './cart/types/redux';
import { IReduxState as IOrdersReduxState } from './orders/types/redux';

import { IAction as IActionCart } from './cart/types/redux';
import { IAction as IActionOrders } from './orders/types/redux';
import { IAction as IActionProducts } from './products/types/redux';

export type TMetaThunk = {
  thunk: {
    name: string;
    key: string;
    type: string;
  } | boolean;
};

export type IAction =
    IActionCart |
    IActionOrders |
    IActionProducts;

export interface IRootReduxState {
  products: IProductsReduxState;
  cart: ICartReduxState;
  orders: IOrdersReduxState;
}
