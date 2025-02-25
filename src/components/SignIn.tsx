import { useEffect, useState } from 'react';
import Input from './forms/Input';
import 'src/scss/components/signup.scss';
import logo from 'src/assets/logo.jpg';
import FormButtons from './forms/Buttons';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUserWithEmailAndPassword } from '../redux/Auth/auth.action';
import { IUserState } from '../redux/User/user.types';
import { IAuthState } from '../redux/Auth/auth.types';
import UserModel from '../model/user';

const mapState = ({ user, auth }: { user: IUserState; auth: IAuthState }) => ({
  currentUser: user.currentUser,
  success: auth.success,
});

const SignIn = () => {
  const { success } = useSelector(mapState);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (success) {
      resetForm();
      navigate('/');
    }
  }, [success]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      dispatch(signInUserWithEmailAndPassword({ email, password }));
      resetForm();
    } catch (error) {
      console.log(error);
      const err = ['Error while signing in. Please try again'];
      setErrors(err);
    }
  };

  return (
    <>
      <section className="signup">
        <div className="wrap">
          <a href="#" className="logo">
            <img className="w-8 h-8 mr-2 rounded-full" src={logo} alt="logo" />
            Mergus
          </a>
          <div className="container">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="heading">Login</h1>
              {errors.length > 0 && (
                <div>
                  <span>Error</span>
                  <ul>
                    {errors.map((error, index) => {
                      return <li key={index}>{error}</li>;
                    })}
                  </ul>
                </div>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <Link
                    to={{
                      pathname: '/forgot-password',
                      search: `?email=${email}`,
                    }}
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Forgot Password
                  </Link>
                </div>
                <FormButtons type="submit">Login</FormButtons>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{' '}
                  <NavLink
                    to="/registration"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Register
                  </NavLink>
                </p>
              </form>
              <FormButtons
                className="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 w-full"
                onClick={() => UserModel.signInWithGoogle()}
              >
                <div className="px-4 py-2">
                  <svg className="w-6 h-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>

                <span className="w-5/6 px-4 font-bold text-center">
                  Sign in with Google
                </span>
              </FormButtons>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
