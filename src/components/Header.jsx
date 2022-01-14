import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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

  getUserName = async () => {
    const userObj = await getUser();
    this.setState({ userName: userObj.name });
  };

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <section>
          { !userName ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">{ userName }</p>
          ) }
        </section>
        <nav>
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
