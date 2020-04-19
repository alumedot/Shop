import { ActionTypes } from './types/ActionTypes';

export const signUp = (email: string, password: string) => {
  return {
    type: ActionTypes.SignUp,
    email,
    password,
  };
};
