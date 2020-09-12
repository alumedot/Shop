import { TMetaThunk } from 'store/types';
import { ActionTypes } from './ActionTypes';

export interface IReduxState {
  token: string | null;
  didTryAutoLogin: boolean;
  userId: string | null;
  error: string | null;
}

export interface ISignUp {
  type: ActionTypes.SignUp,
  email: string,
  password: string,
  meta: TMetaThunk,
}

export interface ISignUpSucceed {
  type: ActionTypes.SignUpSucceed,
  token: string,
  userId: string,
  meta: TMetaThunk,
}

export interface ISignUpFailed {
  type: ActionTypes.SignUpFailed;
  error: string;
  meta: TMetaThunk,
}

export interface ILogin {
  type: ActionTypes.Login,
  email: string,
  password: string,
  meta: TMetaThunk,
}

export interface ILoginSucceed {
  type: ActionTypes.LoginSucceed,
  token: string,
  userId: string,
  meta: TMetaThunk,
}

export interface IAuthenticate {
  type: ActionTypes.Authenticate,
  token: string,
  userId: string,
  expiryDate: number,
  meta: TMetaThunk,
}

export interface ILoginFailed {
  type: ActionTypes.LoginFailed,
  error: string;
  meta: TMetaThunk,
}

export interface ISetDidTryAL {
  type: ActionTypes.SetDidTryAL;
}

export interface ILogout {
  type: ActionTypes.Logout;
}

export type IAction = ILogin
  | ILogout
  | ILoginSucceed
  | ILoginFailed
  | ISignUp
  | ISignUpSucceed
  | IAuthenticate
  | ISetDidTryAL
  | ISignUpFailed;
