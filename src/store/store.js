import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import auth from './modules/auth'
import name from './modules/name'
import notificationText from './modules/notificationText'
import notifyCheck from './modules/notifyCheck'
import userType from './modules/userType'
import connectionCheck from './modules/connectionCheck'
import userCheck from './modules/userCheck'
import profileId from './modules/profileId'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions: {
    logIn({ commit }, { user }) {
      commit('showNotification', false);
      return axios({
        method: 'post',
        url: 'https://banji-mobile-shop.herokuapp.com/users/signin',
        data: user,
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => {
        console.log(response);
        commit('changeName', { name: response.data.userName });
        commit('changeAuthentication', { auth: response.data.token });
        commit('changeType', { type: response.data.userType });
        commit('changeProfileId', response.data.id);
        (response.data.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
        return Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        let text = null;
        if(user.email === '' || user.password === '') {
          text = 'Error:\r\nThere is email or password missing. Please fill inputs or sign up.';
        } else {
          text = 'Error: Your account can\'t be found due to wrong password or e-mail, or simply because it doesn\'t exist. Repair e-mail and/or password or sign up.';        
        }
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
        return Promise.reject();
      });
    },
    signIn({ commit }, userSignIn) {
      console.log(userSignIn)
      commit('showNotification', false);
      return axios({
        method: 'post',
        url: 'https://banji-mobile-shop.herokuapp.com/users/signup',
        data: userSignIn,
        headers: {'Content-Type': 'application/json'}
      })
      .then(response => {
        console.log(response);
        let user = {};
        user.email = userSignIn.email;
        user.password = userSignIn.password;
        return axios({
          method: 'post',
          url: 'https://banji-mobile-shop.herokuapp.com/users/signin',
          data: user,
          headers: {'Content-Type': 'application/json'}
        })
      })
      .then(resp => {
        console.log(resp);
        commit('changeName', { name: response.data.userName });
        commit('changeAuthentication', { auth: response.data.token });
        commit('changeType', { type: response.data.userType });
        (response.data.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
        return Promise.resolve();
      })
      .catch(err => {
        console.log(userSignIn);
        let text = null;
        if ( userSignIn !== undefined) {
          if(userSignIn.email === '' || userSignIn.password === '' || userSignIn.firstName === '' || userSignIn.lastName === '' || userSignIn.passwordCompare === '' || userSignIn.passwordCompare !== userSignIn.password) {
            text = 'Error:\r\nThere is some data missing or passwords dont match. Please fill all inputs correctly.';
          }
        } else {
          text = 'Error: Your account wasn\'t made due to an error. Please try again.';
        }
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
        return Promise.reject();
      });
    },
    userById({ commit }, { id }) {
      console.log(store.state)
      return axios({
        method: 'get',
        url: 'https://banji-mobile-shop.herokuapp.com/users/' + id,
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. Please try again.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    submitUserChanges({ commit }, {user, id}) {
      console.log(id)
      return axios({
        method: 'patch',
        url: 'https://banji-mobile-shop.herokuapp.com/users/' + id,
        data: user,
        headers: {'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        commit('changeName', {name: user.firstName})
        Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. Please try again.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    retAllUsers({ commit }) {
      return axios({
        method: 'get',
        url: 'https://banji-mobile-shop.herokuapp.com/users',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain users. Please try again later.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    deleteUser({commit}, id) {
      return axios({
        method: 'delete',
        url: 'https://banji-mobile-shop.herokuapp.com/users/' + id,
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. You can\'t delete user. Please try again later.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    retAllDevices({ commit }) {
      return axios({
        method: 'get',
        url: 'https://banji-mobile-shop.herokuapp.com/products',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain products. Please try again later.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    insertDevice({ commit }, device) {
      commit('showNotification', false);
      return axios({
        method: 'post',
        url: 'https://banji-mobile-shop.herokuapp.com/products',
        data: device,
        headers: {'Content-Type': 'multipart/form-data', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response);
        commit('checkConnection', true);
        Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        let text = 'Error: Your device can\'t be created. Try again later.';        
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    removeDevice({ commit }, id) {
      return axios({
        method: 'delete',
        url: 'https://banji-mobile-shop.herokuapp.com/products/' + id,
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. You can\'t delete product. Please try again later.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    newOrder({ commit }, order) {
      commit('showNotification', false);
      return axios({
        method: 'post',
        url: 'https://banji-mobile-shop.herokuapp.com/orders',
        data: order,
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response);
        commit('checkConnection', true);
        Promise.resolve();
      })
      .catch(err => {
        console.log(err);
        let text = 'Error: Your device can\'t be created. Try again later.';        
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    retAllOrders({ commit }) {
      return axios({
        method: 'get',
        url: 'https://banji-mobile-shop.herokuapp.com/orders',
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain orders. Please try again later.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    deleteOrder({ commit }, id) {
      return axios({
        method: 'delete',
        url: 'https://banji-mobile-shop.herokuapp.com/orders/' + id,
        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + store.getters.getAuthCode }
      })
      .then(response => {
        console.log(response)
        return Promise.resolve(response);
      })
      .catch(err => {
        console.log(err);
        let text = 'Error:\r\nThere is something wrong. You can\'t delete order. Please try again later.';
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    logOutUser({ commit }) {
      commit('changeNotification', "");
      commit('showNotification', false);
      commit('checkConnection', false);
      commit('changeName', { name: 'Profile' });
      commit('changeAuthentication', '');
      commit('changeType', 'user');
      commit('showUserCard', false);
      return Promise.resolve();
    }
  },
  modules: {
    namespaced: true,
    auth,
    name,
    notificationText,
    notifyCheck,
    userType,
    connectionCheck,
    userCheck,
    profileId
  }
})