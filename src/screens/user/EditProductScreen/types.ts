import { NavigationStackProp } from 'react-navigation-stack';


export interface IParams {
  productId: string;
  submit: () => void;
}

export interface IProps {
  navigation: NavigationStackProp<{}, IParams>;
}
