const state = {
  notifyCheck: false
};

const getters = {
  getNotificationShowCheck: state => {
    return state.notifyCheck;
  }
};

const mutations = {
  showNotification: (state, check) => {
    state.notifyCheck = check;
  }
};

const actions = {
  notify({ commit }, check) {
    commit('showNotification', check);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}