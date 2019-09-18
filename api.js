import fetch from 'isomorphic-unfetch'

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

const ENDPOINT = 'http://localhost:5000';


export const getProducts = () => fetch(`${ENDPOINT}/api/products`)
		.then(response => response.json());

export const getCategories = () => fetch(`${ENDPOINT}/api/category`)
		.then(response => response.json())

export const getCart = (cookie) => fetch(`${ENDPOINT}/api/cart`, {
	withCredentials: true,
	headers: {
		cookie: cookie
	}
}).then(response => response.json())


export const getContents = () => fetch(`${ENDPOINT}/api/contents`).then(response => response.json())


export const addProductToCart = (product) => 
	postJson(`/api/cart`, { id: product.id })

export const removeProductFromCart = (product) => 
	postJson(`/api/removeProduct`, { id: product.id })

export const createOrder = (order) => postJson(`/api/order.json`, order);