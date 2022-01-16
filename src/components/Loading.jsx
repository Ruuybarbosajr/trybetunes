import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Loading extends Component {
  render() {
    const { className } = this.props;
    return (
      <section className={ className }>
        <p>Carregando...</p>
      </section>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string.isRequired,
};
