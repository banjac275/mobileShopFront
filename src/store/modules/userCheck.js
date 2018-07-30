const state = {
    userCheck: false
  };
  
  const getters = {
    getUserCheck: state => {
      return state.userCheck;
    }
  };
  
  const mutations = {
    showUserCard: (state, check) => {
      state.userCheck = check;
    }
  };
  
  const actions = {
    showUser({ commit }, check) {
      commit('showUserCard', check);
    }
  };
  
  export default {
    state,
    getters,
    mutations,
    actions
  }