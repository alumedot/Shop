import CartItem from 'models/cartItem';

import { IReduxStore, IAction } from './types/redux';
import { ActionTypes } from './types/ActionTypes';

const initialState: IReduxStore = {
  items: {},
  totalAmount: 0,
};

export default (state: IReduxStore = initialState, action: IAction): IReduxStore => {
  switch (action.type) {
    case ActionTypes.AddToCart:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      // if (state.items[addedProduct.id]) {
      //   const updatedCartItem = new CartItem(
      //     state.items[addedProduct.id].quantity + 1,
      //     prodPrice,
      //     prodTitle,
      //     state.items[addedProduct.id].sum + prodPrice,
      //   );
      //   return {
      //     ...state,
      //     items: {
      //       ...state.items,
      //       [addedProduct.id]: updatedCartItem,
      //     },
      //     totalAmount: state.totalAmount + prodPrice,
      //   }
      // } else {
      //   const newCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      //   return {
      //     ...state,
      //     items: {
      //       ...state.items,
      //       [addedProduct.id]: newCartItem,
      //     },
      //     totalAmount: state.totalAmount + prodPrice,
      //   }
      // }

      return {
        ...state,
        items: {
          ...state.items,
          [addedProduct.id]: state.items[addedProduct.id] ?
            new CartItem(
              state.items[addedProduct.id].quantity + 1,
              prodPrice,
              prodTitle,
              state.items[addedProduct.id].sum + prodPrice,
            ) :
            new CartItem(1, prodPrice, prodTitle, prodPrice),
        },
        totalAmount: state.totalAmount + prodPrice,
      };
  }
  return state;
}
