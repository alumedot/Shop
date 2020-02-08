import { IProduct } from '../../instance';
import { ActionTypes } from './ActionTypes';


export interface IReduxState {
  availableProducts: IProduct[];
  userProducts: IProduct[];
}

export interface IDeleteProduct {
  type: ActionTypes.DeleteProduct;
  id: string;
}

export type IAction = IDeleteProduct;
