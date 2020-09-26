import { IProduct } from '../../instance';
import { ActionTypes } from './ActionTypes';


export interface IReduxState {
  items: {
    [key: string]: {
      quantity: number,
      title: string,
      ownerPushToken: string,
      price: number,
      sum: number,
    }
  };
  totalAmount: number;
}

export interface IAddToCart {
  type: ActionTypes.AddToCart;
  product: IProduct;
}

export interface IRemoveFromCart {
  type: ActionTypes.RemoveFromCart;
  id: string;
}

export type IAction = IAddToCart | IRemoveFromCart;
