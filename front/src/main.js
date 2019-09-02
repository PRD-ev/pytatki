import Vue from 'vue';
import './registerServiceWorker';
import 'normalize.css';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import VueApollo from 'vue-apollo';

import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(VueApollo);

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: createUploadLink({ uri: 'http://localhost:4000/graphql', credentials: 'include' }),
  cache,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.mixin({
  methods: {
    gql(query, variables) {
      return fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // dev only
        body: JSON.stringify({
          operationName: null,
          variables,
          query,
        }),
      }).then(res => res.json());
    },
  },
});

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
}).$mount('#app');
