import { ICurrentUser } from '../User/user.types';

export interface IAuthState {
  success: boolean;
  user: ICurrentUser | null;
  error: string[];
  loading: boolean;
  resetEmailSent: boolean;
}

export interface IAuthAction {
  type: string;
  payload: IAuthState; // Adjust the type according to your payload type
}

// auth.types.ts
const authTypes = {
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  RESET_PASSWORD_EMAIL_SUCCESS: 'RESET_PASSWORD_EMAIL_SUCCESS',
};

export default authTypes;
