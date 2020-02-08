import CartItem from 'models/cartItem';

import { IAction } from '../types';
import { ActionTypes as ActionTypesOrders } from '../orders/types/ActionTypes';

import { IReduxState } from './types/redux';
import { ActionTypes } from './types/ActionTypes';

const initialState: IReduxState = {
    items: {},
    totalAmount: 0,
};

export default (state: IReduxState = initialState, action: IAction): IReduxState => {
    switch (action.type) {
        case ActionTypes.AddToCart: {
            const addedProduct = action.product;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;

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
        case ActionTypes.RemoveFromCart: {
            const selectedCartItem = state.items[action.id];
            const currentQuantity = selectedCartItem.quantity;
            let updatedCartItems;

            if (currentQuantity > 1) {
                const { quantity, price, title, sum } = selectedCartItem;
                const updatedCartItem = new CartItem(quantity - 1, price, title, sum - price);
                updatedCartItems = { ...state.items, [action.id]: updatedCartItem };
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.id];
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.price,
            }
        }
        case ActionTypesOrders.AddOrder: return initialState;
        default: return {...state};
    }
}
