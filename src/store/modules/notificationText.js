const state = {
  notificationText: ''
};

const getters = {
  getNotificationText: state => {
    return state.notificationText;
  }
};

const mutations = {
  changeNotification: (state, text) => {
    state.notificationText = text;
  }
};

export default {
  state,
  getters,
  mutations
}