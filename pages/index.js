import fetch from 'isomorphic-unfetch'

import { addProduct } from '../store';
import { connect } from 'react-redux';

import { getProducts } from '../api';

class Index extends React.Component {
	static getInitialProps = ({ req, query }) => {
		return getProducts()
		.then(products => ({ products, category: query.category }))
	}
	
	scrollToSection = () => {		
		const key = this.props.category;
		
		const section = this.refs[key];

		if (!section) return ;
		section.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	componentDidMount() {
		this.scrollToSection();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.category !== this.props.category) {
			this.scrollToSection();
		}	
	}

	render() {
		const { products, categories } = this.props;
		return (
			<div>
				{categories.map(category => {
					const productsInCategory = products.filter(p => p.category_id === category.id)
					return (
					<div key={category.key} id={category.key} ref={category.key}>
						<h2 className="category-title">{category.name}</h2>
						<div className="products-list">
							{productsInCategory.map(p => (
								<div key={p.id} className="products-list__item">
									<div className="product">
										<div className="product__image-wrapper">
						                	<img className="product__image" src={'http://localhost:5000/' + p.image} />
						              	</div>
										<div className="product__name">{p.name}</div>
										<div className="product__price-order">
											<div className="product__price">{p.price}</div>
											<div className="product__order">
												<button className="product__order-btn" onClick={() => this.props.addProduct(p)}>заказать</button>
											</div>
										</div>
										<div className="product__description">
											{p.descrition}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)})}				
			</div>
		)		
	}
}

export default connect(
	state => ({ categories: state.categories }),
	{ addProduct }
)(Index);