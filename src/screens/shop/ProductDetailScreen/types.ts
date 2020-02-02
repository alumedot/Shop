import { NavigationStackProp } from 'react-navigation-stack';


export interface IParams {
  productId: string;
  productTitle: string;
}

export interface IProps {
  navigation: NavigationStackProp<IParams>;
}
