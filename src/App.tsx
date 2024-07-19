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
import { useDispatch } from 'react-redux';
import DashboardPage from './pages/DashboardPage';
import WithAuth from './hoc/WithAuth';

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
const App = () => {
  const dispatch = useDispatch();

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
                dispatch(setCurrentUser(updatedUser));
              }
            });
          }
        } else {
          dispatch(setCurrentUser(null));
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

export default App;
