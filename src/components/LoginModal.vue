<template>
  <div>
    <base-modal>
      <template v-slot:modal-content>
        <h3 class="login-header">Sign In</h3>
        <button @click="socialLogin" class="social-button">
          <img
            alt="Sign in with Google"
            src="../assets/google/2x/btn_google_signin_light_normal_web@2x.png"
          >
        </button>
      </template>
      <template v-slot:trigger>
        <div class="login-trigger">Sign In</div>
      </template>
    </base-modal>
  </div>
</template>

<script>
import firebase from 'firebase';

import BaseModal from '@/components/BaseModal.vue';

export default {
  name: 'LoginModal',
  components: {
    BaseModal,
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
  },
};
</script>

<style lang="scss" scoped>
.login-header{
  color: var(--black);
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
  width: 200px;
  background: white;
  padding: 0;
  outline: 0;
  border: 0;
}
.social-button:active img {
  content: url('../assets/google/2x/btn_google_signin_light_pressed_web@2x.png');
}
.social-button img {
  width: 100%;
}
.login-trigger{
  margin-bottom: 25px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
}
</style>
