<template>
  <div>
    <base-modal>
      <template v-slot:modal-content>
        <h3 class="login-header">Zaloguj się</h3>
        <input-with-label>Login</input-with-label>
        <br />
        <input-with-label>Hasło</input-with-label>
        <base-button @click.native="login" size="small">Zaloguj</base-button>
        <button @click="socialLogin" class="social-button">
          <img
            alt="Sign in with Google"
            src="../assets/google/2x/btn_google_signin_light_normal_web@2x.png"
          />
        </button>
      </template>
      <template v-slot:trigger>
        <p class="login-trigger">
          <img class="login-image" src="../assets/icons/logout-box-fill.svg" />
          Zaloguj się
        </p>
      </template>
    </base-modal>
  </div>
</template>

<script>
import firebase from 'firebase';

import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';

export default {
  name: 'LoginModal',
  components: {
    BaseModal,
    BaseButton,
    InputWithLabel,
  },
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
        .then((result) => {
          // eslint-disable-next-line no-console
          console.log(result);
          const user = {
            name: result.additionalUserInfo.profile.name,
            action: 'zalogowany',
            id: result.user.uid,
            token: result.credential.idToken,
          };
          this.$store.dispatch('setUserAction', user);
          this.$router.replace('user');
        })
        .catch((err) => {
          // eslint-disable-next-line no-alert
          alert(`Oops. ${err.message}`);
        });
    },
    login() {
      fetch('http://localhost:4000/login', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({email:'test@test.pl',password:'test'}),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.login-header {
  font-size: 30px;
  color: var(--black);
  margin-top: 0;
  min-width: 200px;
}
.social-button {
  width: 200px;
  background: transparent;
  margin-top: 20px;
  padding: 0;
  outline: 0;
  border: 0;
  cursor: pointer;
}
.social-button:active img {
  content: url('../assets/google/2x/btn_google_signin_light_pressed_web@2x.png');
}
.social-button img {
  width: 100%;
}
.login-trigger {
  margin-bottom: 50px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
}
.login-image {
  height: 23px;
  margin-right: 15px;
  vertical-align: bottom;
  @media (max-width: 768px) {
    height: 34px;
    margin-right: 20px;
  }
}
</style>
