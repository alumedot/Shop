import { Product } from 'models/product';

import { IAction } from '../types';
import { IReduxState } from './types/redux';
import { ActionTypes } from './types/ActionTypes';


const initialState: IReduxState = {
  availableProducts: [],
  userProducts: [],
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
      const {products, userProducts} = action;

      return {
        ...state,
        availableProducts: products,
        userProducts,
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
      return {...state, isLoading: true};
    }
    case ActionTypes.CreateProductSucceed: {
      const {id, title, url, description, price, ownerId, ownerPushToken} = action.productData;
      const newProduct = new Product(id, ownerId, ownerPushToken, title, url, description, price);

      return {
        ...state,
        isLoading: false,
        error: null,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      }
    }
    case ActionTypes.CreateProductFailed: {
      return {...state, isLoading: false, error: action.error};
    }
    case ActionTypes.UpdateProduct: {
      const userProductIndex = state.userProducts.findIndex(item => item.id === action.id);
      const availableProductIndex = state.availableProducts.findIndex(item => item.id === action.id);
      const {title, url, description} = action.productData;

      const updatedProduct = new Product(
        action.id,
        state.userProducts[userProductIndex].ownerId,
        state.userProducts[userProductIndex].ownerPushToken,
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
        isLoading: true,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      }
    }
    case ActionTypes.UpdateProductSucceed: {
      return {...state, isLoading: false, error: null};
    }
    case ActionTypes.UpdateProductFailed: {
      return {...state, isLoading: false, error: action.error}
    }
    case ActionTypes.DeleteProduct: {
      return {
        ...state,
        userProducts: state.userProducts.filter(product => product.id !== action.id),
        availableProducts: state.availableProducts.filter(product => product.id !== action.id),
      };
    }
    default:
      return state;
  }
};
