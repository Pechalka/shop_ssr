import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addProduct, removeProduct } from '../../store';

const OrderItems = ({ cart: { items } }) => (
  <div>
    <h1 key="title">Оформление заказа</h1>
    {items.map((product) => (
      <div key={product.item.id} className="you-order__item">
        <img width="50" src={`http://localhost:5000/${product.item.image}`} alt={product.item.name} />
        <span className="you-order__item-title">{product.item.name}</span>
        <div className="you-order__counter">
          <button type="button" onClick={() => this.props.addProduct(product.item)} className="you-order__counter-btn">+</button>
          <span>{product.qty}</span>
          <button type="button" onClick={() => this.props.removeProduct(product.item)} className="you-order__counter-btn">-</button>
        </div>
      </div>
    ))}
  </div>
);


OrderItems.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.array,
  }).isRequired,
};

export default connect(
  (state) => ({ cart: state.cart }),
  { addProduct, removeProduct },
)(OrderItems);
