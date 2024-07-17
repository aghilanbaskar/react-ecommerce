import userTypes, { ICurrentUser } from './user.types';

export const setCurrentUser = (user: ICurrentUser) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user,
});
