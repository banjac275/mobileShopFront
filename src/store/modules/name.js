const state = {
  name: 'Profile'
};

const getters = {
  getUserName: state => {
    return state.name;
  }
};

const mutations = {
  changeName: (state, { name }) => {
    state.name = name;
  }
};

export default {
  state,
  getters,
  mutations
}