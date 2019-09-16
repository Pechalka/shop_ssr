import React from 'react';
import Link from 'next/link';

import { connect } from 'react-redux';
import { addProduct, removeProduct } from '../../store';

class OrderItems extends React.Component {
	render() {
		const { cart: { items }, totalPrice } = this.props;
		return (
			<div >
				<h1 key='title'>Оформление заказа</h1>
				{items.map(product => (
					<div key={product.item.id} className="you-order__item" >
						<img width="50" src={'http://localhost:5000/' + product.item.image} />
						<span className="you-order__item-title">{product.item.name}</span>
						<div className="you-order__counter">
							<button onClick={() => this.props.addProduct(product.item)} className="you-order__counter-btn">+</button>
							<span>{product.qty}</span>
							<button onClick={() => this.props.removeProduct(product.item)} className="you-order__counter-btn">-</button>
						</div>
					</div>
				))}
			</div>
		);
	}
}

export default connect(
	state => ({ cart: state.cart }),
	{ addProduct, removeProduct }
)(OrderItems);