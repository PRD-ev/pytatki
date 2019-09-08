<template>
  <div>
    <base-modal>
      <template v-slot:modal-content>
        <h3 class="login-header">Zarejestruj się</h3>
        <input-with-label
          :value="name"
          @input.native="name = $event.target.value"
        >Nazwa użytkownika</input-with-label>
        <br />
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
        <base-button @click.native="register" size="small">Zarejestruj</base-button>
      </template>
      <template v-slot:trigger>
        <base-button>Zarejestruj się</base-button>
      </template>
    </base-modal>
  </div>
</template>

<script>
import BaseModal from '@/components/BaseModal.vue';
import BaseButton from '@/components/BaseButton.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';

export default {
  name: 'RegisterModal',
  components: {
    BaseModal,
    BaseButton,
    InputWithLabel,
  },
  data() {
    return {
      email: '',
      password: '',
      name: '',
    };
  },
  methods: {
    register() {
      fetch('http://localhost:4000/register', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          name: this.name,
        }),
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
