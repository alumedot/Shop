import PRODUCTS from 'data/dummy-data';

import { Product } from 'models/product';

import { IAction } from '../types';
import { IReduxState } from './types/redux';
import { ActionTypes } from './types/ActionTypes';


const initialState: IReduxState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
    isLoading: false,
    error: null,
};

export default (state: IReduxState = initialState, action: IAction): IReduxState => {
    switch (action.type) {
        case ActionTypes.GetProducts: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case ActionTypes.GetProductsSucceed: {
            return {
                ...state,
                availableProducts: action.products,
                userProducts: action.products.filter(product => product.ownerId === 'u1'),
                isLoading: false,
                error: null,
            };
        }
        case ActionTypes.GetProductsFailed: {
            return {
                ...state,
                availableProducts: [],
                isLoading: false,
                error: action.error,
            }
        }
        case ActionTypes.CreateProduct: {
            const {title, url, description, price} = action.productData;
            const newProduct = new Product(new Date().toString(), 'u1', title, url, description, price);

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.availableProducts.concat(newProduct),
            }
        }
        case ActionTypes.CreateProductSucceed: {
            return { ...state };
        }
        case ActionTypes.UpdateProduct: {
            const userProductIndex = state.userProducts.findIndex(item => item.id === action.id);
            const availableProductIndex = state.availableProducts.findIndex(item => item.id === action.id);
            const { title, url, description} = action.productData;

            const updatedProduct = new Product(
                action.id,
                state.userProducts[userProductIndex].ownerId,
                title,
                url,
                description,
                state.userProducts[userProductIndex].price,
            );

            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProductIndex] = updatedProduct;
            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[userProductIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts,
            }
        }
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
