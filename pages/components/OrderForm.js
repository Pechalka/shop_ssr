import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createOrder } from '../../store';

// TODO: validation
class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.customerName = React.createRef();
    this.phone = React.createRef();
    this.address = React.createRef();
  }

  save = (e) => {
    e.preventDefault();
    const data = {
      customerName: this.customerName.value,
      phone: this.phone.value,
      address: this.address.value,
    };

    this.props.createOrder(data);
  }

  render() {
    const { cart: { items } } = this.props;
    return (
      <div className="order-address ">
        <h2 className="order-address__title">Адрес доставки</h2>
        <form onSubmit={this.save} action="/order" method="POST">
          <div className="order-address__control">
            <p className="order-address__label">Имя</p>
            <input ref={this.customerName} name="customerName" type="text" />
          </div>
          <div className="order-address__control">
            <p className="order-address__label">Телефон</p>
            <input ref={this.phone} name="phone" type="text" />
          </div>
          <div className="order-address__control">
            <p className="order-address__label">Адрес</p>
            <textarea ref={this.address} name="addres" rows="4" />
          </div>
          <div className="order-address__btn-container">
            <button disabled={items.length === 0} className=" order-address__btn" type="submit">оформить</button>
          </div>
        </form>
      </div>
    );
  }
}

OrderForm.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
};

export default connect(
  (state) => ({ cart: state.cart }),
  { createOrder },
)(OrderForm);
