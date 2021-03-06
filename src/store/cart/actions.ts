import { IProduct } from 'store/instance';
import { ActionTypes } from 'store/cart/types/ActionTypes';


export const addToCart = (product: IProduct) => {
  return { type: ActionTypes.AddToCart, product };
};

export const removeFromCart = (id: string) => {
  return { type: ActionTypes.RemoveFromCart, id };
};
