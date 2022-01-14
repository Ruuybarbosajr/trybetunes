import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class AlbumCard extends Component {
  render() {
    const { albumList, nameSearched } = this.props;
    if (albumList.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <section>
        <p>{ `Resultado de álbuns de: ${nameSearched}` }</p>
        { albumList.map(
          (album) => (
            <Link
              key={ album.collectionId }
              data-testid={ `link-to-album-${album.collectionId}` }
              to={ `/album/${album.collectionId}` }
            >
              <div>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
              </div>
            </Link>
          ),
        ) }
      </section>
    );
  }
}

AlbumCard.propTypes = {
  nameSearched: PropTypes.string.isRequired,
  albumList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
