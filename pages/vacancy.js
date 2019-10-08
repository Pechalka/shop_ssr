import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputText from './components/InputText';

const Vacancy = ({ vacancyHtml }) => (
  <InputText html={vacancyHtml} />
);

Vacancy.propTypes = {
  vacancyHtml: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    vacancyHtml: state.contents['vacancy'],
  }),
)(Vacancy);
