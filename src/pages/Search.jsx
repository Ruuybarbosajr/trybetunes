import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      isDisabled: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    if (value.length >= 2) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  }

  render() {
    const { isDisabled } = this.state;
    return (
      <div
        data-testid="page-search"
      >
        <Header />
        <form>
          <label htmlFor="inputNameSearch">
            <input
              data-testid="search-artist-input"
              type="text"
              name="nameSearch"
              id="nameSearch"
              placeholder="Nome do Artista"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
