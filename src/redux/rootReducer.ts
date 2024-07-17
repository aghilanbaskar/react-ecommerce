import { combineReducers } from 'redux';
import userReducer from './User/user.reducer';
import { IUserState } from './User/user.types';

const rootReducer = combineReducers<{ user: IUserState }>({
  user: userReducer,
});

export default rootReducer;
