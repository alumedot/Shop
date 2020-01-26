import PRODUCTS from 'data/dummy-data';

import { IReduxStore } from './types/redux';


const initialState: IReduxStore = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

export default (state: IReduxStore = initialState, action: any): IReduxStore => {
  return state;
};
