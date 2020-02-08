import CartItem from 'models/cartItem';

import { IAction } from '../types';
import { ActionTypes as ActionTypesOrders } from '../orders/types/ActionTypes';
import { ActionTypes as ActionTypesProducts } from '../products/types/ActionTypes';

import { IReduxState } from './types/redux';
import { ActionTypes } from './types/ActionTypes';


const initialState: IReduxState = {
    items: {},
    totalAmount: 0,
};

export default (state: IReduxState = initialState, action: IAction): IReduxState => {
    switch (action.type) {
        case ActionTypes.AddToCart: {
            const {id, price, title} = action.product;

            return {
                ...state,
                items: {
                    ...state.items,
                    [id]: state.items[id] ?
                        new CartItem(
                            state.items[id].quantity + 1,
                            price,
                            title,
                            state.items[id].sum + price,
                        ) :
                        new CartItem(1, price, title, price),
                },
                totalAmount: state.totalAmount + price,
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
        case ActionTypesProducts.DeleteProduct: {
            const { id } = action;
            if (!state.items[id]) { return state; }

            const updatedItems = { ...state.items };
            delete updatedItems[id];

            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - state.items[id].sum,
            }
        }
        case ActionTypesOrders.AddOrder: return initialState;
        default: return {...state};
    }
}
