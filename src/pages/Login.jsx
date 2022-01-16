import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../css-pages/login/login.css';
import Logo from '../css-pages/login/logo.png';

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
    if (isLoading) return <Loading className="loading-login" />;
    return (
      <div data-testid="page-login" className="div-login">
        <section className="section-img-login">
          <img src={ Logo } alt="logo-trybetunes" />
        </section>
        <form onSubmit={ this.redirecting } className="form-login">
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
