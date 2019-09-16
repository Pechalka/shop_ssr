import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import fetch from 'isomorphic-unfetch'

const appInitialState = {
  categories: [],
  cart: {
  	items: [],
  	totalQty: 0,
  	totalPrice: 0
  },
  orderMsg: '',
  contents: {}
}


export const reducer = (state = appInitialState, action) => {
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

export const resetOrderMsg = () => ({ type: 'RESET_ORDER_MSG' })

const getCategories = () => fetch('http://localhost:3000/api/category')
		.then(response => response.json())

const getCart = (cookie) => fetch('http://localhost:3000/api/cart', {
	withCredentials: true,
	headers: {
		cookie: cookie
	}
}).then(response => response.json())

const getContents = () => fetch('http://localhost:3000/api/contents').then(response => response.json())

export const appInit = (cookie) => (dispatch, getState) => {
	return Promise.all([
		getCategories(), 
		getCart(cookie),
    getContents()
	]).then(([categories, cart, contents]) => {
		dispatch({ type: 'SET_CATEGORIES', payload: categories });
		dispatch({ type: 'SET_CART', payload: cart });
    dispatch({ type: 'SET_CONTENTS', payload: contents });
	})
}


function postJson(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())    
}

export const addProduct = (product) => (dispatch, getState) => {
	postJson('http://localhost:3000/api/cart', { id: product.id }).then(cart => {
		dispatch({ type: 'SET_CART', payload: cart });
	})
}

export const removeProduct = (product) => (dispatch, getState) => {
	postJson('http://localhost:3000/api/removeProduct', { id: product.id }).then(cart => {
		dispatch({ type: 'SET_CART', payload: cart });
	})
}

export const createOrder = (order) => (dispatch, getState) => {
	postJson('/api/order.json', order).then(({ cart, text }) => {
		dispatch({ type: 'SET_CART', payload: cart });
		dispatch({ type: 'SHOW_ORDER_MSG', payload: text })
	})
}

export function initializeStore (initialState = appInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}