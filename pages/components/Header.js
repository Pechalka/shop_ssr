import React from 'react';
// import Link from 'next/link';
import {Link} from '../../routes'

import { connect } from 'react-redux';

class Header extends React.Component {
	render() {
		const { categories, totalPrice } = this.props;
		return (
			<div className='header'>
				<Link href='/'>
					<a className='logo' >Суппер Пицца</a>
				</Link>

				<div>
					<ul className='menu1'>
						{categories.map(c => (
							<li key={c.id}>
								<Link scroll={false} route='home' params={{ category: c.key }} >
									<a>{c.name}</a>
								</Link>
							</li>
						))}
					</ul>
					
					<ul className='menu2'>
				      <li>
				      	<Link href='/contacts'>
				      		<a >Контакты</a>
				      	</Link>
				      	</li>
				      <li>
				      	<Link href='/vacancy'>
				      		<a >Вакансии</a>
				      	</Link>
				      </li>
				    </ul>
				</div>
				
				<div className="card">
					<span>Корзина:</span>
					<span>{totalPrice}</span>
					{totalPrice > 0 && <Link href='/order'><a>Оформить</a></Link>}
				</div>
			</div>
		);
	}
}

export default connect(
	state => ({ categories: state.categories, totalPrice: state.cart.totalPrice })
)(Header);