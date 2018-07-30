const state = {
  connectionCheck: false
};

const getters = {
  getConnectionCheck: state => {
    return state.connectionCheck;
  }
};

const mutations = {
  checkConnection: (state, check) => {
    state.connectionCheck = check;
  }
};

const actions = {
  isConnected({ commit }, check) {
    commit('checkConnection', check);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}