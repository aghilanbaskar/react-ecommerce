import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import { IUserState } from './User/user.types';
import authReducer from './Auth/auth.reducer';
import { IAuthState } from './Auth/auth.types';

const rootReducer = combineReducers<{ user: IUserState; auth: IAuthState }>({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
