import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { IUserState } from '../redux/User/user.types';

const LoginRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useSelector(
    (state: { user: IUserState }) => state.user
  );

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LoginRoute;
