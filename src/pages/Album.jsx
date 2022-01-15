import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor({
    match: {
      params: { id },
    },
  }) {
    super();

    this.state = {
      isIdAlbum: id,
      isMusicList: [],
      isAlbumInfo: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { isIdAlbum } = this.state;
    const isMusicListAndInfo = await getMusics(isIdAlbum);
    this.setState({
      isAlbumInfo: isMusicListAndInfo[0],
      isMusicList: [
        ...isMusicListAndInfo.filter(({ kind }) => kind === 'song'),
      ],
    });
  };

  sendSong = (target) => {
    this.setState({ isLoading: true }, async () => {
      await addSong(target.id);
      this.setState({ isLoading: false });
    });
  }

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({ [name]: target.checked }, () => this.sendSong(target));
  };

  stateDeconstruction = (trackId) => {
    const { [trackId]: checkedInput } = this.state;
    return checkedInput;
  };

  render() {
    const {
      isMusicList, isLoading,
      isAlbumInfo: { artistName, collectionName, artworkUrl100 },
    } = this.state;
    return (
      <>
        <Header />
        { isLoading ? (
          <Loading />
        ) : (
          <div data-testid="page-album">
            <section>
              <img src={ artworkUrl100 } alt="" />
              <h3 data-testid="album-name">{ collectionName }</h3>
              <p data-testid="artist-name">{ artistName }</p>
            </section>
            <section>
              { isMusicList.map(({ trackId, previewUrl, trackName }) => (
                <MusicCard
                  key={ trackId }
                  trackId={ trackId }
                  previewUrl={ previewUrl }
                  trackName={ trackName }
                  checked={ this.stateDeconstruction(trackId) }
                  onInputChange={ this.handleChange }
                />
              )) }
            </section>
          </div>
        ) }
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.objectOf(PropTypes.string),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
