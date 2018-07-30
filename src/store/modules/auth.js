const state = {
  auth: ''
};

const getters = {
  getAuthCode: state => {
    return state.auth;
  }
};

const mutations = {
  changeAuthentication: (state, { auth }) => {
    state.auth = auth;
  }
};

export default {
  state,
  getters,
  mutations
}