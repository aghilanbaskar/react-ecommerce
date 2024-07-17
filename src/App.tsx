import { useEffect } from 'react';
import HomePage from './pages/HomePage';
import '@/scss/default.scss';
import RegistrationPage from './pages/RegistrationPage';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayouts from './layouts/MainLayouts';
import LoginPage from './pages/LoginPage';
import { auth, fetchOrAddUser } from './firebase/utils';
import { Unsubscribe, User } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import LoginRoute from './util/loginRoute';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { setCurrentUser } from './redux/User/user.action';
import { ICurrentUser, IUserState } from './redux/User/user.types';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import DashboardPage from './pages/DashboardPage';
import WithAuth from './hoc/WithAuth';

interface IAppProps {
  setCurrentUser: (user: ICurrentUser) => void;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route index element={<HomePage />} />
      <Route
        path="/registration"
        element={
          <LoginRoute>
            <RegistrationPage />
          </LoginRoute>
        }
      />
      <Route
        path="/login"
        element={
          <LoginRoute>
            <LoginPage />
          </LoginRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <LoginRoute>
            <ForgotPasswordPage />
          </LoginRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <WithAuth>
            <DashboardPage />
          </WithAuth>
        }
      />
    </Route>
  )
);

const App = (props: IAppProps) => {
  const { setCurrentUser } = props;

  useEffect(() => {
    let userDocListener: Unsubscribe | null = null;
    const firebaseAuthListener = auth.onAuthStateChanged(
      async (user: User | null) => {
        if (user) {
          const userRef = await fetchOrAddUser(user);
          if (userRef) {
            userDocListener = onSnapshot(userRef, (doc) => {
              if (doc.exists()) {
                const documentData = doc.data();
                const documentId = doc.id;
                const updatedUser = { documentId, ...documentData };
                setCurrentUser(updatedUser);
              }
            });
          }
        } else {
          setCurrentUser(null);
          if (userDocListener) userDocListener();
          userDocListener = null;
        }
      }
    );

    return () => {
      if (firebaseAuthListener) {
        firebaseAuthListener();
      }
    };
  }, []);

  return <RouterProvider router={router} />;
};

const mapStateToProps = ({ user }: { user: IUserState }) => {
  return {
    currentUser: user.currentUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCurrentUser: (user: ICurrentUser) => dispatch(setCurrentUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
