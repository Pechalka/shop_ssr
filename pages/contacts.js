import React from 'react';
import { connect } from 'react-redux';
import Map from './components/Map';
import InputText from './components/InputText';

const Contacts = ({ contents }) => (
  <div>
    <InputText html={contents['contacts_top']} />

    <Map />

    <InputText html={contents['contacts_bottom']} />
  </div>
);

export default connect(
  (state) => ({
    contents: state.contents,
  }),
)(Contacts);
