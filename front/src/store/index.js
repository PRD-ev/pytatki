/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    currentGroup: {
      name: 'Grupa Krzysia',
    },
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUserAction(context, user) {
      context.commit('setUser', user);
    },
  },
});
