import 'src/scss/header.scss';
import logo from 'src/assets/logo.jpg';
import { Link, NavLink } from 'react-router-dom';
import { IUserState } from '../redux/User/user.types';
import { useSelector } from 'react-redux';
import UserModel from '../model/user';

const mapState = ({ user }: { user: IUserState }) => {
  return {
    currentUser: user.currentUser,
  };
};

const Header = () => {
  const { currentUser } = useSelector(mapState);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'navLinkActive' : 'navLink';
  return (
    <div className="header">
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src={logo}
              className="h-14 rounded-full overflow-hidden"
              alt="Mergus Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Mergus
            </span>
          </a>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            {currentUser ? (
              <ul>
                <li>
                  <NavLink to="/" className={linkClass}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" className={linkClass}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <Link to="/" onClick={() => UserModel.signOut()}>
                    Logout
                  </Link>
                </li>
              </ul>
            ) : (
              <ul>
                <li>
                  <NavLink to="/login" className={linkClass}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/registration" className={linkClass}>
                    Register
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
