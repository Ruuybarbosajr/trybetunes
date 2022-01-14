import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

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
    };
  }

  componentDidMount() {
    this.fetchMusics();
  }

  fetchMusics = async () => {
    const { isIdAlbum } = this.state;
    const isMusicListAndInfo = await getMusics(isIdAlbum);
    console.log(isMusicListAndInfo);
    this.setState({
      isAlbumInfo: isMusicListAndInfo[0],
      isMusicList: [...isMusicListAndInfo.filter(({ kind }) => kind === 'song')],
    });
  };

  render() {
    const { isMusicList,
      isAlbumInfo: { artistName, collectionName, artworkUrl100 } } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <img src={ artworkUrl100 } alt="" />
          <h3 data-testid="album-name">{ collectionName }</h3>
          <p data-testid="artist-name">{ artistName }</p>
        </section>
        <MusicCard isMusicList={ isMusicList } />
      </div>
    );
  }
}

// Album.propType = {
//   match:
// }
