import { IAction, IReduxState } from './types/redux';
import { ActionTypes } from './types/ActionTypes';

const initialState = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  error: null,
}

export default (state: IReduxState = initialState, action: IAction): IReduxState => {
  switch (action.type) {
    case ActionTypes.Login: return {...state, error: null};
    case ActionTypes.LoginFailed: return {...state, error: action.error};
    case ActionTypes.Authenticate: {
      const {token, userId} = action;
      return {
        ...state,
        token,
        userId,
        didTryAutoLogin: true,
        error: null,
      }
    }
    case ActionTypes.SetDidTryAL: return { ...state, didTryAutoLogin: true };
    case ActionTypes.SignUp: return {...state, error: null};
    case ActionTypes.SignUpFailed: return {...state, error: action.error};
    case ActionTypes.Logout: return { ...initialState, didTryAutoLogin: true };
    default: return state;
  }
};
