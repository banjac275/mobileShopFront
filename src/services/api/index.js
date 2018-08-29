import axios from 'axios'
import config from '@/config'

export default {

  logInUser (data) {
    return axios({ method: 'post', url: config.logIn_url, data: data, headers: {'Content-Type': 'application/json'}});
  },
  signUpUser (data) {
    return axios({method: 'post', url: config.signUp_url, data: data, headers: {'Content-Type': 'application/json'}});
  },
  obtainUser (id, header) {
    return axios({method: 'get', url: config.users_url + '/' + id, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}})
  },
  changeUser (id, data, header) {
    return axios({method: 'patch', url: config.users_url + '/' + id, data: data, headers: {'Authorization': 'Bearer ' + header}});
  },
  allUsers (header) {
    return axios({method: 'get', url: config.users_url, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}})
  },
  eraseUser (id, header) {
    return axios({method: 'delete', url: config.users_url + '/' + id, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}});
  },
  allDevices (header) {
    return axios({method: 'get', url: config.products_url, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}})
  },
  newDevice (data, header) {
    return axios({method: 'post', url: config.products_url, data: data, headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + header}});
  },
  eraseDevice (id, header) {
    return axios({method: 'delete', url: config.products_url + '/' + id, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}});
  },
  allOrders (header) {
    return axios({method: 'get', url: config.orders_url, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}})
  },
  createOrder (data, header) {
    return axios({method: 'post', url: config.orders_url, data: data, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}});
  },
  eraseOrder (id, header) {
    return axios({method: 'delete', url: config.orders_url + '/' + id, headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + header}});
  }
}