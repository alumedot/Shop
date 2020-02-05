import { IProduct } from '../../instance';
import { ActionTypes } from './ActionTypes';


export interface IReduxState {
  items: {
    [key: string]: {
      quantity: number,
      title: string,
      price: number,
      sum: number,
    }
  },
  totalAmount: number,
}

export interface IAddToCart {
  type: ActionTypes.AddToCart,
  product: IProduct,
}

export type IAction = IAddToCart;
