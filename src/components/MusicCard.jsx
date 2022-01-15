import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackId, previewUrl, trackName, onInputChange, checked } = this.props;

    return (
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
          <code>{ trackName }</code>
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            name={ trackId }
            id={ trackId }
            checked={ checked }
            onChange={ onInputChange }
            data-testid={ `checkbox-music-${trackId}` }
          />
          Favorita
        </label>
      </li>
    );
  }
}

MusicCard.defaultProps = {
  checked: false,
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
};
