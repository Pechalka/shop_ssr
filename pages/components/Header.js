import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from '../../routes';

const Header = ({ categories, totalPrice }) => (
  <div className="header">
    <Link href="/">
      <a href="/" className="logo">Суппер Пицца</a>
    </Link>

    <div>
      <ul className="menu1">
        {categories.map((c) => (
          <li key={c.id}>
            <Link scroll={false} route="home" params={{ category: c.key }}>
              <a href="/">{c.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <ul className="menu2">
        <li>
          <Link href="/contacts">
            <a href="/contacts">Контакты</a>
          </Link>
        </li>
        <li>
          <Link href="/vacancy">
            <a href="/vacancy">Вакансии</a>
          </Link>
        </li>
      </ul>
    </div>

    <div className="card">
      <span>Корзина:</span>
      <span>{totalPrice}</span>
      {totalPrice > 0 && <Link href="/order"><a href="/order">Оформить</a></Link>}
    </div>
  </div>
);

Header.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default connect(
  (state) => ({
    categories: state.categories,
    totalPrice: state.cart.totalPrice,
  }),
)(Header);
