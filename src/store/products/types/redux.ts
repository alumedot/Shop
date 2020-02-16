import { AxiosError } from 'axios';

import { IProduct } from '../../instance';
import { ActionTypes } from './ActionTypes';


export interface IReduxState {
  availableProducts: IProduct[];
  userProducts: IProduct[];
}

export interface IProductData {
  title: string,
  description: string,
  url: string,
  price: number,
}

export interface IProductAction<Type extends ActionTypes> {
  type: Type;
  productData: IProductData;
}

export interface ICreateProduct extends IProductAction<ActionTypes.CreateProduct> {}
export interface IUpdateProduct extends IProductAction<ActionTypes.UpdateProduct> {
  id: string;
}

export interface ICreateProductSucceed {
  type: ActionTypes.CreateProductSucceed;
  name: string;
}

export interface ICreateProductFailed {
  type: ActionTypes.CreateProductFailed;
  error: AxiosError;
}

export interface IDeleteProduct {
  type: ActionTypes.DeleteProduct;
  id: string;
}

export type IAction =
    ICreateProduct |
    ICreateProductSucceed |
    IUpdateProduct |
    IDeleteProduct;
