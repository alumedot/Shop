import { TMetaThunk } from 'store/types';
import { ActionTypes } from './ActionTypes';

export interface IReduxState {
  error: string | null;
  token: string | null;
  userId: string | null;
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
  meta: TMetaThunk,
}

export interface ILoginFailed {
  type: ActionTypes.LoginFailed,
  error: string;
  meta: TMetaThunk,
}

export type IAction = ILogin
  | ILoginSucceed
  | ILoginFailed
  | ISignUp
  | ISignUpSucceed
  | IAuthenticate
  | ISignUpFailed;
