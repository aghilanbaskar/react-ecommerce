import { Component, createContext, ReactNode } from 'react';
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
import { DocumentData, onSnapshot } from 'firebase/firestore';

interface IAppState {
  currentUser: DocumentData | null;
}
const initialState: IAppState = {
  currentUser: null,
};
// Create a context for currentUser
const UserContext = createContext<IAppState>({ ...initialState });

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayouts />}>
      <Route index element={<HomePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

class App extends Component<object, IAppState> {
  private firebaseAuthListener: Unsubscribe | null = null;
  private userDocListener: Unsubscribe | null = null;

  constructor(props: object) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  componentDidMount(): void {
    this.firebaseAuthListener = auth.onAuthStateChanged(
      async (user: User | null) => {
        if (user) {
          const userRef = await fetchOrAddUser(user);
          if (userRef) {
            this.userDocListener = onSnapshot(userRef, (doc) => {
              if (doc.exists()) {
                const documentData = doc.data();
                const documentId = doc.id;
                this.setState({ currentUser: { documentId, ...documentData } });
              }
            });
          }
        } else {
          this.setState({ ...initialState });
          if (this.userDocListener) this.userDocListener();
          this.userDocListener = null;
        }
      }
    );
  }

  componentWillUnmount(): void {
    if (this.firebaseAuthListener) {
      this.firebaseAuthListener();
    }
  }

  render(): ReactNode {
    const { currentUser } = this.state;
    return (
      <UserContext.Provider value={{ currentUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    );
  }
}

export default App;
export { UserContext };
