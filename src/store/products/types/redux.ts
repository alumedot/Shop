import { AxiosError } from 'axios';

import { IProduct } from '../../instance';
import { ActionTypes } from './ActionTypes';


export interface IReduxState {
  availableProducts: IProduct[];
  userProducts: IProduct[];
  isLoading: boolean;
  error: AxiosError | null;
}

export interface IProductData {
  id: string,
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
  productData: IProductData;
}

export interface ICreateProductFailed {
  type: ActionTypes.CreateProductFailed;
  error: AxiosError;
}

export interface IUpdateProductSucceed {
  type: ActionTypes.UpdateProductSucceed;
}

export interface IUpdateProductFailed {
  type: ActionTypes.UpdateProductFailed;
  error: AxiosError;
}

export interface IDeleteProductFailed {
  type: ActionTypes.DeleteProductFailed;
  error: AxiosError;
}

export interface IGetProducts {
  type: ActionTypes.GetProducts;
}

export interface IGetProductsSucceed {
  type: ActionTypes.GetProductsSucceed;
  products: IProduct[];
}

export interface IGetProductsFailed {
  type: ActionTypes.GetProductsFailed;
  error: AxiosError;
}

export interface IDeleteProduct {
  type: ActionTypes.DeleteProduct;
  id: string;
}

export type IAction =
    ICreateProduct |
    ICreateProductSucceed |
    IGetProducts |
    IGetProductsSucceed |
    IGetProductsFailed |
    IUpdateProduct |
    IDeleteProduct;
