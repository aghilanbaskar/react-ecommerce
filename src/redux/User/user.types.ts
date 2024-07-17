import { DocumentData } from 'firebase/firestore';

export type ICurrentUser = DocumentData | null;
export interface IUserState {
  currentUser: ICurrentUser;
}

export interface Action {
  type: string;
  payload: object; // Adjust the type according to your payload type
}

// user.types.ts
const userTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};

export default userTypes;
