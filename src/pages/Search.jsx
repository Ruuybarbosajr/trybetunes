import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      artistNameSearched: '',
      artistName: '',
      isDisabled: true,
      isLoading: false,
      albumList: null,
    };
  }

  fetchAlbunsArtist = async () => {
    const { artistNameSearched } = this.state;
    const isAlbumList = await searchAlbumsAPIs(artistNameSearched);
    this.setState({
      albumList: [...isAlbumList],
      isLoading: false,
      artistName: artistNameSearched,
      artistNameSearched: '',
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({
      isLoading: true,
      albumList: null,
    }, this.fetchAlbunsArtist);
  };

  checkButton = () => {
    const { artistNameSearched } = this.state;
    if (artistNameSearched.length >= 2) this.setState({ isDisabled: false });
    else this.setState({ isDisabled: true });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ artistNameSearched: value }, this.checkButton);
  };

  render() {
    const { isDisabled, artistNameSearched, isLoading, albumList,
      artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="inputNameSearch">
            <input
              data-testid="search-artist-input"
              type="text"
              name="nameSearch"
              id="nameSearch"
              placeholder="Nome do Artista"
              value={ artistNameSearched }
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
        { isLoading && <Loading /> }
        { albumList && <AlbumCard albumList={ albumList } nameSearched={ artistName } /> }
      </div>
    );
  }
}
