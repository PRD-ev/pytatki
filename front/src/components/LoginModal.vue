<template>
  <div>
    <base-modal>
      <template v-slot:modal-content>
        <form @submit.prevent="login">
          <h3 class="login-header">Zaloguj się</h3>
          <input-with-label
            type="email"
            :value="email"
            @input.native="email = $event.target.value"
          >Adres email</input-with-label>
          <br />
          <input-with-label
            type="password"
            :value="password"
            @input.native="password = $event.target.value"
          >Hasło</input-with-label>
          <input type="submit" @click.native="login" value="Zaloguj"/>
        </form>
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
    login() {
      fetch('http://localhost:4000/login', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({ email: this.email, password: this.password }),
      })
        .then(res => res.json())
        .then(res => {
          this.$store.dispatch('setUserAction', res);
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
