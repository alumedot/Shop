import PRODUCTS from 'data/dummy-data';

import { IReduxState } from './types/redux';


const initialState: IReduxState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter(product => product.ownerId === 'u1'),
};

export default (state: IReduxState = initialState, action: any): IReduxState => {
  return state;
};
