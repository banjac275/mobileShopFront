import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import name from './modules/name'
import notificationText from './modules/notificationText'
import notifyCheck from './modules/notifyCheck'
import userType from './modules/userType'
import connectionCheck from './modules/connectionCheck'
import userCheck from './modules/userCheck'
import profileId from './modules/profileId'
import api from '@/services/api/'

Vue.use(Vuex)

export const store = new Vuex.Store({
  actions: {
    logIn({ commit }, { user }) {
      commit('showNotification', false);
      return api.logInUser(user)
      .then(response => {
        commit('changeName', { name: response.data.userName });
        commit('changeAuthentication', { auth: response.data.token });
        commit('changeType', { type: response.data.userType });
        commit('changeProfileId', response.data.id);
        (response.data.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
        localStorage.setItem('storedUser', JSON.stringify(store.state))
        return Promise.resolve();
      })
      .catch(err => {
        let text = null;
        if(user.email === '' || user.password === '') {
          text = 'Error:\r\nThere is email or password missing. Please fill inputs or sign up.';
        } else {
          text = 'Error: Your account can\'t be found due to wrong password or e-mail, or simply because it doesn\'t exist. Repair e-mail and/or password or sign up.';        
        }
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    signIn({ commit }, userSignIn) {
      commit('showNotification', false);
      return api.signUpUser(userSignIn)
      .then(response => {
        let user = {};
        user.email = userSignIn.email;
        user.password = userSignIn.password;
        return api.logInUser(user)
      })
      .then(resp => {
        commit('changeName', { name: resp.data.userName });
        commit('changeAuthentication', { auth: resp.data.token });
        commit('changeType', { type: resp.data.userType });
        commit('changeProfileId', resp.data.id);
        (resp.data.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
        localStorage.setItem('storedUser', store.state)
        return Promise.resolve();
      })
      .catch(err => {
        let text = null;
        if ( userSignIn !== undefined) {
          if(userSignIn.email === '' || userSignIn.password === '' || userSignIn.firstName === '' || userSignIn.lastName === '' || userSignIn.passwordCompare === '' || userSignIn.passwordCompare !== userSignIn.password) {
            text = 'Error:\r\nThere is some data missing or passwords don\'t match. Please fill all inputs correctly.';
          }
        } else {
          text = 'Error: Your account wasn\'t made due to an error. Please try again.';
        }
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    userById({ commit }, { id }) {
      return api.obtainUser(id, store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. Please try again.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
      });
    },
    submitUserChanges({ commit }, {user, id}) {
      return api.changeUser(id, user, store.getters.getAuthCode)
      .then(response => {
        return api.obtainUser(id, store.getters.getAuthCode)     
      })
      .then(resp => {
        console.log(resp)
        if (resp.data.firstName !== undefined) commit('changeName', {name: resp.data.firstName})
        return Promise.resolve(resp);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. Please try again.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    retAllUsers({ commit }) {
      return api.allUsers(store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain users. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    deleteUser({commit}, id) {
      return api.eraseUser(id, store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t delete user. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    retDevice({ commit }, id) {
      return api.obtainDevice(id, store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain product. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      })
    },
    srcDevice({ commit }, {search}) {
      return api.findDevice(search, store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response)
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t find product. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      })
    },
    retAllDevices({ commit }) {
      return api.allDevices(store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain products. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    insertDevice({ commit }, device) {
      commit('showNotification', false);
      return api.newDevice(device, store.getters.getAuthCode)
      .then(response => {
        commit('checkConnection', true);
        Promise.resolve();
      })
      .catch(err => {
        let text = 'Error: Your device can\'t be created. Try again later.';     
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};   
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    removeDevice({ commit }, id) {
      return api.eraseDevice(id, store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t delete product. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    newOrder({ commit }, order) {
      commit('showNotification', false);
      return api.createOrder(order, store.getters.getAuthCode)
      .then(response => {
        commit('checkConnection', true);
        Promise.resolve();
      })
      .catch(err => {
        let text = 'Error: Your device can\'t be created. Try again later.';     
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};   
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    retAllOrders({ commit }) {
      return api.allOrders(store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t obtain orders. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
      });
    },
    deleteOrder({ commit }, id) {
      return api.eraseOrder(id, store.getters.getAuthCode)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(err => {
        let text = 'Error:\r\nThere is something wrong. You can\'t delete order. Please try again later.';
        if (err.response.data.message === "Auth failed") {commit('checkConnection', false); text = 'Authentication failed. Please log in again.';};
        commit('changeNotification', text);
        commit('showNotification', true);
        return Promise.reject(err.response.data.message);
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
      localStorage.setItem('storedUser', null)
      return Promise.resolve();
    },
    onStart({ commit }) {
      let tempData = JSON.parse(localStorage.getItem('storedUser'))
      if (tempData !== null) {
        console.log(tempData)
        commit('changeName', { name: tempData.name.name });
        commit('changeAuthentication', { auth: tempData.auth.auth });
        commit('changeType', { type: tempData.userType.userType });
        commit('changeProfileId', tempData.profileId.profileId);
        (tempData.userType.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
      }
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