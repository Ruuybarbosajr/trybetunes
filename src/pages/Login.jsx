import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const MIN_LENGTH_NAME = 3;

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      isDisabled: true,
      isLogged: false,
      isLoading: false,
    };
  }

  redirecting = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ isLoading: true }, async () => {
      await createUser({ name: userName });
      this.setState({ isLogged: true });
    });
  };

  checkButton = () => {
    const { userName } = this.state;
    if (userName.length >= MIN_LENGTH_NAME) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  };

  handleChange = ({ target: { value } }) => {
    this.setState(
      {
        userName: value,
      },
      this.checkButton,
    );
  };

  render() {
    const { isDisabled, isLogged, isLoading } = this.state;
    if (isLogged) return <Redirect to="/search" />;
    if (isLoading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.redirecting }>
          <label htmlFor="nameIput">
            <input
              type="text"
              data-testid="login-name-input"
              id="nameIput"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ isDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
