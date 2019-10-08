import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { resetOrderMsg } from '../store';
import OrderItems from './components/OrderItems';
import OrderForm from './components/OrderForm';
import InputText from './components/InputText';

class Order extends React.Component {
  componentDidMount() {
    this.props.resetOrderMsg();
  }

  render() {
    const { orderMsg } = this.props;

    if (orderMsg) {
      return (
        <InputText html={orderMsg} />
      );
    }

    return (
      <div>
        <OrderItems />
        <OrderForm />
      </div>
    );
  }
}

Order.propTypes = {
  orderMsg: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({
    orderMsg: state.orderMsg,
  }),
  { resetOrderMsg },
)(Order);
