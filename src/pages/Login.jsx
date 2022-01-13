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
      isLoading: true,
    };
  }

  endRequest = () => {
    const { isLoading } = this.state;
    if (isLoading) return <Loading />;
    return <Redirect to="/search" />;
  };

  redirecting = (event) => {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({ isLogged: true }, async () => {
      await createUser({ name: userName });
      this.setState({ isLoading: false });
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
    const { isDisabled, isLogged } = this.state;
    return (
      <div data-testid="page-login">
        { isLogged ? (
          this.endRequest()
        ) : (
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
        ) }
      </div>
    );
  }
}
