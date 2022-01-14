import React, { Component } from 'react';
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
        <div>
          { !userName ? (
            <Loading />
          ) : (
            <p data-testid="header-user-name">{ userName }</p>
          ) }
        </div>
      </header>
    );
  }
}
