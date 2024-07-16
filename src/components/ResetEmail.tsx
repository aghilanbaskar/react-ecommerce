import { Component } from 'react';
import Input from './forms/Input';
import 'src/scss/components/signup.scss';
import logo from 'src/assets/logo.jpg';
import FormButtons from './forms/Buttons';
import { NavLink } from 'react-router-dom';
import UserModel from '../model/user';

interface IState {
  email: string;
  errors: string[];
}
const initialState: IState = {
  email: '',
  errors: [],
};

class ResetEmail extends Component<object, IState> {
  constructor(props: object) {
    super(props);
    const emailQuery = new URLSearchParams(window.location.search).get('email');
    this.state = {
      ...initialState,
      email: emailQuery || '',
    };
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
      await UserModel.sendPasswordResetEmail(this.state.email);
      this.setState({
        ...initialState,
      });
    } catch (error) {
      console.error('email-reset', error);
      const err = ['Email not found. Please try again'];
      this.setState((prevState) => ({
        ...prevState,
        errors: err,
      }));
    }
  }
  render() {
    const { email, errors } = this.state;
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
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={this.handleSubmit}
                >
                  <div>
                    <Input
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={this.handleChange}
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
  }
}

export default ResetEmail;
