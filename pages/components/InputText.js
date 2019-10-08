import React from 'react';
import PropTypes from 'prop-types';

const InputText = ({ html }) => (
  <div className="input-text" dangerouslySetInnerHTML={{ __html: html }} />
);

InputText.propTypes = {
  html: PropTypes.string.isRequired,
};

export default InputText;
