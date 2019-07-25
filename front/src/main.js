import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store/index';
import './registerServiceWorker';
import 'normalize.css';

let app;

const config = {
  apiKey: 'AIzaSyCHA8e7OX7EoG5H__paGNOXeuNVZjFz8iQ',
  authDomain: 'pytatki-1559814016089.firebaseapp.com',
  databaseURL: 'https://pytatki-1559814016089.firebaseio.com',
  projectId: 'pytatki-1559814016089',
  storageBucket: 'pytatki-1559814016089.appspot.com',
};

firebase.initializeApp(config);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
