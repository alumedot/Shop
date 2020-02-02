import { IProduct } from '../../instance';


export interface IReduxStore {
  availableProducts: IProduct[];
  userProducts: IProduct[];
}
