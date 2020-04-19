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

export interface IFormUpdate {
  type: FormActions.FormInputUpdate;
  value: string;
  isValid: boolean;
  inputId: InputIds;
}

export type IFormAction = IFormUpdate;
