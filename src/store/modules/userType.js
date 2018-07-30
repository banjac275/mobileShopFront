const state = {
  userType: ''
};

const getters = {
  getUserType: state => {
    return state.userType;
  }
};

const mutations = {
  changeType: (state, { type }) => {
    state.userType = type;
  }
};

export default {
  state,
  getters,
  mutations
}