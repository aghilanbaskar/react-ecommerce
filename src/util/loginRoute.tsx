import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App'; // Adjust the path according to your project structure

const LoginRoute = ({ children }: { children: JSX.Element }) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LoginRoute;
