import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    friends: ['Adam', 'Tomek', 'Patryk', ' Kostek'],
  },
  getters: {
    userAction(state) {
      return `${state.user.name} ${state.user.action}`;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    addFriend(state, friend) {
      state.friends = [friend, ...state.friends];
    },
  },
  actions: {
    addFriendAction(context) {
      context.commit('addFriend', 'nowy kolega');
    },
  },
});
