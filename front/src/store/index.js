/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    user: {},
    currentGroup: {
      name: 'Grupa Krzysia',
    },
  },
  getters: {},
  mutations: {
    updateUser(state, user) {
      state.user = { ...state.user, ...user };
    },
    setUser(state, user) {
      state.user = user;
    },
    setUserImage(state, image) {
      state.user.image = image;
    },
  },
  actions: {
    updateUserAction(context, user) {
      context.commit('updateUser', user);
    },
    setUserAction(context, user) {
      context.commit('setUser', user);
    },
    setUserImageAction(context, image) {
      context.commit('setUserImage', image);
    },
  },
});
