import React from 'react';
import Link from 'next/link';

import { connect } from 'react-redux';
import { createOrder } from '../../store';

// TODO: validation
class OrderForm extends React.Component {
	save = (e) => {
		e.preventDefault();
		const data = {
			customerName: this.refs.customerName.value,
			phone: this.refs.phone.value,
			address: this.refs.address.value,
		};
		this.props.createOrder(data);
	}
	render() {
		const { cart: { items }, totalPrice } = this.props;
		return (
			<div className="order-address ">
			  <h2 className="order-address__title">Адрес доставки</h2>
			  <form onSubmit={this.save}  action="/order" method="POST">
			    <div className="order-address__control">
			      <p className="order-address__label">Имя</p>
			      <input ref='customerName' name='customerName' type="text" />
			    </div>
			    <div className="order-address__control">
			      <p className="order-address__label">Телефон</p>
			      <input ref='phone' name='phone' type="text" />
			    </div>
			    <div className="order-address__control">
			      <p className="order-address__label">Адрес</p>
			      <textarea ref='address' name='address' rows="4"></textarea>
			    </div>
			    <div className="order-address__btn-container">
			      <button disabled={items.length == 0} className=" order-address__btn" type="submit">оформить</button>
			    </div>
			  </form>
			</div>
		);
	}
}

export default connect(
	state => ({ cart: state.cart }),
	{ createOrder }
)(OrderForm);