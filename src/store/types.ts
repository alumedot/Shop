import { IReduxState as IProductsReduxStore } from './products/types/redux';
import { IReduxState as ICartReduxState } from './cart/types/redux';


export interface IRootReduxState {
  products: IProductsReduxStore;
  cart: ICartReduxState;
}
