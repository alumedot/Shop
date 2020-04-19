import { ActionTypes } from './types/ActionTypes';
import { IGetProducts, IGetProductsSucceed } from 'src/store/products/types/redux';

export const deleteProduct = (id: string) => {
  return {type: ActionTypes.DeleteProduct, id};
};

export const productAction = (
  type: ActionTypes,
  title: string,
  description: string,
  url: string,
  price: number,
  id?: string
) => {
  return {
    type,
    id,
    productData: {
      title,
      description,
      url,
      price,
    },
  };
};

export const createProduct = (title: string, description: string, url: string, price: number) => {
  return productAction(ActionTypes.CreateProduct, title, description, url, price);
};

export const updateProduct = (id: string, title: string, description: string, url: string) => {
  return productAction(ActionTypes.UpdateProduct, title, description, url, 0, id);
};

export const getProducts = (): IGetProducts | Promise<IGetProductsSucceed> => {
  return {
    type: ActionTypes.GetProducts,
    meta: {thunk: true},
  };
};
