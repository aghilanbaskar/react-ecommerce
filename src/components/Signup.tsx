import { Component } from 'react';
import Input from './forms/Input';
import 'src/scss/components/signup.scss';
import logo from 'src/assets/logo.jpg';
import FormButtons from './forms/Buttons';
import { fetchOrAddUser } from '../firebase/utils';
import UserModel from '../model/user';

interface IState {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  errors: string[];
}
const initialState: IState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
  errors: [],
};
class Signup extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      console.log(this.state);
      const { displayName, email, password, confirmPassword } = this.state;
      if (password !== confirmPassword) {
        const err = ["Passwords don't match"];
        this.setState((prevState) => ({
          ...prevState,
          errors: err,
        }));
      }
      const userModel = await UserModel.createUser(
        email,
        password,
        displayName
      );
      if (userModel) {
        await fetchOrAddUser(userModel.user, { displayName, email, password });
      }
    } catch (error) {
      const message = (error as Error).message;
      const err = [message];
      this.setState((prevState) => ({
        ...prevState,
        errors: err,
      }));
    }
  }
  render() {
    const { displayName, email, password, confirmPassword, errors } =
      this.state;
    return (
      <>
        <section className="signup">
          <div className="wrap">
            <a href="#" className="logo">
              <img
                className="w-8 h-8 mr-2 rounded-full"
                src={logo}
                alt="logo"
              />
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
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={this.handleSubmit}
                >
                  <div>
                    <Input
                      type="text"
                      label="Full Name"
                      name="displayName"
                      placeholder="Full Name"
                      value={displayName}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      label="Password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      label="Confirm Password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={this.handleChange}
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
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
  }
}

export default Signup;
