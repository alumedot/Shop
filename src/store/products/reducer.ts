import PRODUCTS from 'data/dummy-data';

import { IAction } from '../types';
import { IReduxState } from './types/redux';
import { ActionTypes } from './types/ActionTypes';


const initialState: IReduxState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

export default (state: IReduxState = initialState, action: IAction): IReduxState => {
    switch (action.type) {
        case ActionTypes.DeleteProduct: {
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.id),
                availableProducts: state.availableProducts.filter(product => product.id !== action.id),
            };
        }
        default: return state;
    }
};
