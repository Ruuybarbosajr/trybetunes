import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Logo from '../css-pages/header/logo.svg';
import Space from '../css-pages/header/space-user.png';
import Icone from '../css-pages/header/icon-user.png';
import '../css-pages/header/header.css';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      userName: undefined,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  // fix Warning: Can't perform a React state update on an unmounted component
  // auxílio do summer Rod
  componentWillUnmount() {
    this.setState = () => { };
  }

  getUserName = async () => {
    const userObj = await getUser();
    this.setState({ userName: userObj.name });
  };

  render() {
    const { userName } = this.state;
    return (
      <header
        data-testid="header-component"
        className="header-page"
      >
        <div className="container-header">
          <img src={ Logo } alt="logo-trybetunes" className="logo-img" />
          <section className="section-name-user">
            <img src={ Space } alt="" className="space-img" />
            <img src={ Icone } alt="" className="icon-img" />
            { !userName ? (
              <Loading className="name-user" />
            ) : (
              <p data-testid="header-user-name" className="name-user">{ userName }</p>
            ) }
          </section>
        </div>
        <nav className="nav-page">
          <li>
            <Link
              to="/search"
              data-testid="link-to-search"
            >
              Search
            </Link>
          </li>
          <li>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
            >
              Favorites
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              data-testid="link-to-profile"
            >
              Profile
            </Link>
          </li>
        </nav>
      </header>
    );
  }
}
