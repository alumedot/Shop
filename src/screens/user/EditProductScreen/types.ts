import { NavigationStackProp } from 'react-navigation-stack';


export interface IParams {
  productId: string;
  submit: () => void;
}

export interface IProps {
  navigation: NavigationStackProp;
}

export interface IFormState {
  inputValues: {
    title: string;
    url: string;
    description: string;
    price: number;
  },
  inputValidities: {
    title: boolean;
    url: boolean;
    description: boolean;
    price: boolean;
  },
  formIsValid: boolean;
}
