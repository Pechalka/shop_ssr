import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addProduct } from '../store';
import { getProducts } from '../api';

class Home extends React.Component {
  static getInitialProps = ({ query }) => getProducts()
    .then((products) => ({ products, category: query.category }));

  componentDidMount() {
    this.scrollToSection();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.category !== this.props.category) {
      this.scrollToSection();
    }
  }

  scrollToSection = () => {
    const { category } = this.props;
    const section = this[category];

    if (!section) return;

    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  render() {
    const { products, categories } = this.props;
    return (
      <div>
        {categories.map((category) => {
          const productsInCategory = products.filter((p) => p.category_id === category.id);
          return (
            <div
              key={category.key}
              id={category.key}
              ref={(node) => { this[category.key] = node; }}
            >
              <h2 className="category-title">{category.name}</h2>
              <div className="products-list">
                {productsInCategory.map((p) => (
                  <div key={p.id} className="products-list__item">
                    <div className="product">
                      <div className="product__image-wrapper">
                        <img className="product__image" src={`http://localhost:5000/${p.image}`} alt={p.name} />
                      </div>
                      <div className="product__name">{p.name}</div>
                      <div className="product__price-order">
                        <div className="product__price">{p.price}</div>
                        <div className="product__order">
                          <button type="button" className="product__order-btn" onClick={() => this.props.addProduct(p)}>заказать</button>
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
          );
        })}
      </div>
    );
  }
}


Home.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  category: PropTypes.string.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({ categories: state.categories }),
  { addProduct },
)(Home);
