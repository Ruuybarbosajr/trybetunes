import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      isFavorite: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getListFavorites();
  }

  getListFavorites = async () => {
    const { trackId } = this.props;
    const listFavorite = await getFavoriteSongs();
    this.setState({ isFavorite: listFavorite.some(({ trackId: id }) => id === trackId) });
  }

  sendFavoriteSong = async (music) => {
    await addSong(music);
    this.setState({
      isLoading: false,
      isFavorite: true,
    });
  }

  removeFavoriteSong = async (music) => {
    await removeSong(music);
    this.setState({
      isLoading: false,
      isFavorite: false,
    });
  }

  handleChange = (music) => {
    const { isFavorite } = this.state;
    if (isFavorite) {
      this.setState({ isLoading: true }, () => this.removeFavoriteSong(music));
    } else {
      this.setState({ isLoading: true }, () => this.sendFavoriteSong(music));
    }
  }

  render() {
    const { trackId, previewUrl, trackName, music } = this.props;
    const { isLoading, isFavorite } = this.state;
    return isLoading
      ? <Loading />
      : (
        <li>
          { trackName }
          <br />
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            { ' ' }
            <code>trackName</code>
          </audio>
          <label htmlFor={ trackId }>
            <input
              type="checkbox"
              name={ trackId }
              checked={ isFavorite }
              id={ trackId }
              onChange={ () => this.handleChange(music) }
              data-testid={ `checkbox-music-${trackId}` }
            />
            Favorita
          </label>
        </li>
      );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
    artistName: PropTypes.string.isRequired,
    artistViewUrl: PropTypes.string.isRequired,
    artworkUrl30: PropTypes.string.isRequired,
    artworkUrl60: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionCensoredName: PropTypes.string.isRequired,
    collectionExplicitness: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number.isRequired,
    collectionViewUrl: PropTypes.string.isRequired,
    contentAdvisoryRating: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    discCount: PropTypes.number.isRequired,
    discNumber: PropTypes.number.isRequired,
    isStreamable: PropTypes.bool.isRequired,
    kind: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    primaryGenreName: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    trackCensoredName: PropTypes.string.isRequired,
    trackCount: PropTypes.number.isRequired,
    trackExplicitness: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    trackNumber: PropTypes.number.isRequired,
    trackPrice: PropTypes.number.isRequired,
    trackTimeMillis: PropTypes.number.isRequired,
    trackViewUrl: PropTypes.string.isRequired,
    wrapperType: PropTypes.string.isRequired,
  }).isRequired,
};
