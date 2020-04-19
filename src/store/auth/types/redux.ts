import { AxiosError } from 'axios';
import { ActionTypes } from './ActionTypes';

export interface ISignUp {
  type: ActionTypes.SignUp,
  email: string,
  password: string,
}

export interface ISignUpSucceed {
  type: ActionTypes.SignUpSucceed,
  email: string,
  password: string,
}

export interface ISignUpFailed {
  type: ActionTypes.SignUpFailed;
  error: AxiosError;
}
