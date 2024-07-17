import { useState } from 'react';
import Input from './forms/Input';
import 'src/scss/components/signup.scss';
import logo from 'src/assets/logo.jpg';
import FormButtons from './forms/Buttons';
import { fetchOrAddUser } from '../firebase/utils';
import UserModel from '../model/user';

const Signup = () => {
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (!password || !confirmPassword) {
        const err = ['Please enter a password'];
        setErrors(err);
        return;
      }
      if (!displayName) {
        const err = ['Please enter a display name'];
        setErrors(err);
        return;
      }
      if (!email) {
        const err = ['Please enter an email'];
        setErrors(err);
        return;
      }
      if (password !== confirmPassword) {
        const err = ["Passwords don't match"];
        setErrors(err);
        return;
      }
      const userModel = await UserModel.createUser(
        email,
        password,
        displayName
      );
      if (userModel) {
        await fetchOrAddUser(userModel.user, { displayName, email, password });
      }
      resetForm();
    } catch (error) {
      const message = (error as Error).message;
      const err = [message];
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
              <h1 className="heading">Create an account</h1>
              {errors.length > 0 && (
                <ul>
                  {errors.map((error, index) => {
                    return <li key={index}>{error}</li>;
                  })}
                </ul>
              )}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <Input
                    type="text"
                    label="Full Name"
                    name="displayName"
                    placeholder="Full Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{' '}
                      <a
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <FormButtons type="submit">Create an account</FormButtons>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
