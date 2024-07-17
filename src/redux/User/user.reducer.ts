import userTypes, { Action, IUserState } from './user.types';

const INITIAL_STATE: IUserState = {
  currentUser: null,
};

const userReducer = (
  state: IUserState = INITIAL_STATE,
  action: Action
): IUserState => {
  switch (action.type) {
    case userTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
