import authTypes, { IAuthAction, IAuthState } from './auth.types';

const INITIAL_STATE: IAuthState = {
  success: false,
  error: [],
  loading: false,
  user: null,
  resetEmailSent: false,
};

const authReducer = (
  state: IAuthState = INITIAL_STATE,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case authTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case authTypes.RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        resetEmailSent: true,
      };
    default:
      return state;
  }
};

export default authReducer;
