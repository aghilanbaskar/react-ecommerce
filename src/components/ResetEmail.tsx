import { useEffect, useState } from 'react';
import Input from './forms/Input';
import 'src/scss/components/signup.scss';
import logo from 'src/assets/logo.jpg';
import FormButtons from './forms/Buttons';
import { NavLink } from 'react-router-dom';
import { IAuthState } from '../redux/Auth/auth.types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetEmail } from '../redux/Auth/auth.action';
import { IUserState } from '../redux/User/user.types';

const mapState = ({ user, auth }: { user: IUserState; auth: IAuthState }) => ({
  currentUser: user.currentUser,
  success: auth.resetEmailSent,
  errors: auth.error,
});
const ResetEmail = () => {
  const { success, errors } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');

  const resetForm = () => {
    setEmail('');
  };

  useEffect(() => {
    if (success) {
      resetForm();
    }
  }, [success]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(resetEmail(email));
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
              <h1 className="heading">Reset Password</h1>
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
                <FormButtons type="submit">Send Email</FormButtons>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Know your password?{' '}
                  <NavLink
                    to="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetEmail;
