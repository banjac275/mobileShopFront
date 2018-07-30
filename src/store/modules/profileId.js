const state = {
    profileId: ''
  };
  
  const getters = {
    getProfileId: state => {
      return state.profileId;
    }
  };
  
  const mutations = {
    changeProfileId: (state, id) => {
      state.profileId = id;
    }
  };
  
  export default {
    state,
    getters,
    mutations
  }