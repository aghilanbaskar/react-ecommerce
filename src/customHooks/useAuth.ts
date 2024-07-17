import { useSelector } from 'react-redux';
import { IUserState } from '../redux/User/user.types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const mapState = ({ user }: { user: IUserState }) => ({
  currentUser: user.currentUser,
});

const useAuth = () => {
  const { currentUser } = useSelector(mapState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser]);
  return { currentUser };
};

export default useAuth;
