export interface IFormState {
  inputValues: {
    email: string;
    password: string;
  },
  inputValidities: {
    email: boolean;
    password: boolean;
  },
  formIsValid: boolean;
}
