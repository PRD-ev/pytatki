<template>
  <base-container>
    <current-location/>
    <settings-group title="Użytkownik">
      <div class="user-with-buttons">
        <base-user size="medium"/>
        <div>
          <base-button>Zmień zdjęcie</base-button>
          <base-button>Zmień hasło</base-button>
          <base-button>Usuń konto</base-button>
        </div>
      </div>
      <div class="two-inputs">
        <input-with-label>komponent input size 50% i 100% z labelem</input-with-label>
        <div class="flex-divider"></div>
        <input-with-label>komponent input size 50% i 100% z labelem</input-with-label>
      </div>
      <input-with-label>komponent input size 50% i 100% z labelem</input-with-label>
    </settings-group>
  </base-container>
</template>

<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import BaseButton from '@/components/BaseButton.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import SettingsGroup from '@/components/SettingsGroup.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';

export default Vue.extend({
  name: 'settings',
  components: {
    BaseUser,
    BaseContainer,
    BaseButton,
    CurrentLocation,
    SettingsGroup,
    InputWithLabel,
  },
});
</script>

<style lang="scss" scoped>
.user-with-buttons {
  display: flex;
  margin: 20px 0;
}
.two-inputs {
  display: flex;
}
.flex-divider {
  width: 50px;
}
</style>
