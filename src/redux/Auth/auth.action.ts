import { Dispatch } from 'redux';
import UserModel from '../../model/user';
import authType from './auth.types';

// Update the return type of signInUserWithEmailAndPassword to return the action object
export const signInUserWithEmailAndPassword =
  ({ email, password }: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: authType.SIGNIN_SUCCESS,
        payload: {
          loading: true,
        },
      });
      const user = await UserModel.signIn(email, password);
      const payload = {
        success: true,
        user,
        error: [],
        loading: false,
        resetEmailSent: false,
      };
      dispatch({ type: authType.SIGNIN_SUCCESS, payload });
      return payload;
    } catch (error) {
      const payload = {
        success: false,
        user: null,
        error: ['Error while signing in. Please try again'],
        loading: false,
      };
      dispatch({ type: authType.SIGNIN_SUCCESS, payload });
      return payload;
    }
  };

export const signUpUserWithEmailAndPassword =
  ({
    email,
    password,
    confirmPassword,
    displayName,
  }: {
    email: string;
    password: string;
    confirmPassword: string;
    displayName: string;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      if (confirmPassword !== password) {
        throw new Error("Passwords don't match");
      }
      if (!displayName) {
        throw new Error('Please enter a display name');
      }
      if (!email) {
        throw new Error('Please enter an email');
      }
      dispatch({
        type: authType.SIGNIN_SUCCESS,
        payload: {
          loading: true,
        },
      });
      const user = await UserModel.createUser(email, password, displayName);
      const payload = {
        success: true,
        user,
        error: [],
        loading: false,
      };
      dispatch({ type: authType.SIGNIN_SUCCESS, payload });
      return payload;
    } catch (error: { message: string }) {
      const payload = {
        success: false,
        user: null,
        error: [error?.message || 'Error while signing in. Please try again'],
        loading: false,
      };
      dispatch({ type: authType.SIGNIN_SUCCESS, payload });
      return payload;
    }
  };

export const resetEmail = (email: string) => async (dispatch: Dispatch) => {
  try {
    await UserModel.sendPasswordResetEmail(email);
    const payload = {
      success: true,
      error: [],
      loading: false,
    };
    dispatch({ type: authType.RESET_PASSWORD_EMAIL_SUCCESS, payload });
    return payload;
  } catch (error: { message: string }) {
    const payload = {
      success: false,
      error: [
        error.message ?? 'Error while resetting password. Please try again',
      ],
      loading: false,
    };
    dispatch({ type: authType.SIGNIN_SUCCESS, payload });
  }
};
