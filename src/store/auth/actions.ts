import { ActionTypes } from './types/ActionTypes';

export const signUp = (email: string, password: string) => {
  return {
    type: ActionTypes.SignUp,
    email,
    password,
    meta: {thunk: true},
  };
};

export const login = (email: string, password: string) => {
  return {
    type: ActionTypes.Login,
    email,
    password,
    meta: {thunk: true},
  };
};
