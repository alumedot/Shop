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
