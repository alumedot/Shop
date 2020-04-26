export interface IAuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  kind: string;
  localId: string;
}

export interface ISignUpSucceed extends IAuthResponse {}

export interface ILoginSucceed extends IAuthResponse {
  registered: string;
}
