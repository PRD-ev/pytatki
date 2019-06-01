<template>
  <base-container>
    <current-location/>
    <settings-group>
      Użytkownik
      <div>
        <img src="" alt="user image">
        <base-button>Zmień zdjęcie</base-button>
        <base-button>Zmień hasło</base-button>
        <base-button>Usuń konto</base-button>
      </div>
      <input-with-label>
        komponent input size 50% i 100% z labelem
      </input-with-label>
    </settings-group>
  </base-container>
</template>

<script>
import Vue from 'vue';
import BaseContainer from '@/components/BaseContainer.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import SettingsGroup from '@/components/SettingsGroup.vue';
import BaseButton from '@/components/BaseButton.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';

export default Vue.extend({
  name: 'settings',
  components: {
    BaseContainer,
    CurrentLocation,
    SettingsGroup,
    BaseButton,
    InputWithLabel,
  },
});
</script>

<style lang="scss" scoped>

</style>
