import { IProduct } from '../../instance';


export interface IReduxState {
  availableProducts: IProduct[];
  userProducts: IProduct[];
}
