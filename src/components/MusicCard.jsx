import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { isMusicList } = this.props;
    return (
      <section>
        { isMusicList.map((music) => (
          <li key={ music.trackId }>
            { music.trackName }
            <audio
              data-testid="audio-component"
              src={ music.previewUrl }
              controls
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              { ' ' }
              <code>music.trackName</code>
            </audio>
          </li>
        )) }
      </section>
    );
  }
}

MusicCard.propTypes = {
  isMusicList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
