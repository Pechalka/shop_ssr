import * as api from '../api';

export const initialState = {
  categories: [],
  cart: {
  	items: [],
  	totalQty: 0,
  	totalPrice: 0
  },
  orderMsg: '',
  contents: {}
}


export const reducer = (state = initialState, action) => {
  switch (action.type) {
  	case 'SET_CATEGORIES': {
  		return {
  			...state,
  			categories: action.payload
  		}
  	}
  	case 'SET_CART': {
  		return {
  			...state,
  			cart: action.payload
  		}
  	}

  	case 'SHOW_ORDER_MSG': {
  		return {
  			...state,
  			orderMsg: action.payload
  		}
  	}

  	case 'RESET_ORDER_MSG': {
  		return {
  			...state,
  			orderMsg: null
  		}
  	}

    case 'SET_CONTENTS': {
      const contents = {};
      action.payload.forEach(item => {
        contents[item.key] = item.value
      })
      return {
        ...state,
        contents
      }
    }

    default:
      return state
  }
}

export const appInit = (cookie) => (dispatch, getState) => {
	return Promise.all([
		api.getCategories(), 
		api.getCart(cookie),
    api.getContents()
	]).then(([categories, cart, contents]) => {
		dispatch({ type: 'SET_CATEGORIES', payload: categories });
		dispatch({ type: 'SET_CART', payload: cart });
    dispatch({ type: 'SET_CONTENTS', payload: contents });
	})
}


export const updateShoppingCart = (cart) => ({ type: 'SET_CART', payload: cart });

export const addProduct = (product) => (dispatch, getState) => {
	api.addProductToCart(product).then(cart => {
		dispatch(updateShoppingCart(cart));
	})
}

export const removeProduct = (product) => (dispatch, getState) => {
	api.removeProductFromCart(product).then(cart => {
		dispatch(updateShoppingCart(cart));
	})
}

export const resetOrderMsg = () => ({ type: 'RESET_ORDER_MSG' })

export const createOrder = (order) => (dispatch, getState) => {
	api.createOrder(order).then(({ cart, text }) => {
		dispatch(updateShoppingCart(cart));
		dispatch({ type: 'SHOW_ORDER_MSG', payload: text })
	})
}