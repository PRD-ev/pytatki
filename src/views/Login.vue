<template>
  <base-container class="login">
    <h3>Sign In</h3>
    <br>
    <button @click="socialLogin" class="social-button">
      <img alt="Google Logo" src="../assets/google-logo.png">
    </button>
  </base-container>
</template>

<script>
import firebase from 'firebase';

import BaseContainer from '../components/BaseContainer';

export default {
  name: 'login',
  components: { BaseContainer },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    socialLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let user = {
            name: result.additionalUserInfo.profile.name,
            action: 'zalogowany',
            id: result.user.uid,
          };
          this.$store.commit('setUser', user);
          this.$router.replace('user');
        })
        .catch(err => {
          alert('Oops. ' + err.message);
        });
    },
  },
};
</script>

<style scoped>
/* "scoped" attribute limit the CSS to this component only */
.login {
  margin: 40px;
}
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
p a {
  text-decoration: underline;
  cursor: pointer;
}
.social-button {
  width: 75px;
  background: white;
  padding: 10px;
  border-radius: 100%;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  outline: 0;
  border: 0;
}
.social-button:active {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
  width: 100%;
}
</style>
