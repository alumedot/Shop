import { AsyncStorage } from 'react-native';
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

export const authenticate = (userId: string, token: string, expiryDate: number) => {
  return {
    type: ActionTypes.Authenticate,
    userId,
    token,
    expiryDate,
  }
};

export const setDidTryAL = () => {
  return { type: ActionTypes.SetDidTryAL };
}

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: ActionTypes.Logout }
};
