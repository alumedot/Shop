import { IReduxStore as IProductsReduxStore } from './products/types/redux';


export interface IRootReduxState {
  products: IProductsReduxStore;
}
