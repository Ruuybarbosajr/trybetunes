import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      isMusicList: [],
      isAlbumInfo: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const isMusicListAndInfo = await getMusics(id);
    this.setState({
      isAlbumInfo: isMusicListAndInfo[0],
      isMusicList: [
        ...isMusicListAndInfo.filter(({ kind }) => kind === 'song'),
      ],
    });
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
              { isMusicList.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackId={ music.trackId }
                  previewUrl={ music.previewUrl }
                  trackName={ music.trackName }
                  music={ music }
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
