import OrderItems from './components/OrderItems';
import OrderForm from './components/OrderForm'

import { resetOrderMsg } from '../store';
import { connect } from 'react-redux';
import InputText from './components/InputText';

class Order extends React.Component {
	componentDidMount() {
		this.props.resetOrderMsg()
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
		)
	}
}

export default connect(
	state => ({
		orderMsg: state.orderMsg
	}),
	{ resetOrderMsg }
)(Order);