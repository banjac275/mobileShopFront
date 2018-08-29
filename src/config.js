const API_URL = 'http://localhost'
const API_PORT = ':3000'

export default {
  images_url: API_URL + API_PORT + '/',
  logIn_url: API_URL + API_PORT + '/users/signin',
  signUp_url: API_URL + API_PORT + '/users/signup',
  users_url: API_URL + API_PORT + '/users',
  products_url: API_URL + API_PORT + '/products',
  orders_url: API_URL + API_PORT + '/orders',
}