import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'normalize.css';

Vue.config.productionTip = false;

Vue.mixin({
  methods: {
    gql(query) {
      return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // dev only
        body: JSON.stringify({
          operationName: null,
          variables: {},
          query,
        }),
      }).then(res => res.json());
    },
  },
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
