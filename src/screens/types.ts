import { NavigationStackProp } from 'react-navigation-stack';


export interface INavProps {
  navigation: NavigationStackProp;
}

export enum FormActions {
  FormInputUpdate = 'FORM_INPUT_UPDATE',
}

export enum InputIds {
  Title = 'title',
  Url = 'url',
  Price = 'price',
  Description = 'description',
  Email = 'email',
  Password = 'password',
}

export interface IFormUpdate {
  type: FormActions.FormInputUpdate;
  value: string;
  isValid: boolean;
  inputId: InputIds;
}

export type IFormAction = IFormUpdate;
