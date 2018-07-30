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
        commit('changeAuthentication', { auth: response.data.auth });
        commit('changeType', { type: response.data.userType });
        (response.data.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
        Promise.resolve();
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
      });
    },
    signIn({ commit }, { userSignIn }) {
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
        if ( userSignIn.email !== undefined || userSignIn.password !== undefined) {
          user.email = userSignIn.email;
          user.password = userSignIn.password;
        }
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
        commit('changeAuthentication', { auth: response.data.auth });
        commit('changeType', { type: response.data.userType });
        (response.data.userType === 'admin') ? commit('showUserCard', true) : commit('showUserCard', false);
        commit('checkConnection', true);
        Promise.resolve();
      })
      .catch(err => {
        console.log(userSignIn);
        let text = null;
        if ( userSignIn !== undefined) {
          if(userSignIn.email === '' || userSignIn.password === '' || userSignIn.firstName === '' || userSignIn.lastName === '' || passwordCompare === '' || passwordCompare !== userSignIn.password) {
            text = 'Error:\r\nThere is some data missing or passwords dont match. Please fill all inputs correctly.';
          }
        } else {
          text = 'Error: Your account wasn\'t made due to an error. Please try again.';
        }
        commit('changeNotification', text);
        commit('showNotification', true);
        commit('checkConnection', false);
      });
    },
    
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