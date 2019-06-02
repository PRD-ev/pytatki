<template>
  <div class="settings-group">
    <p class="settings-group__title">{{title}}</p>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'SettingsGroup',
  props: {
    title: String,
  },
});
</script>

<style lang="scss" scoped>
.settings-group {
  border: solid 1px var(--orange);
  border-radius: 10px;
  padding: 25px;
  margin: 25px 0;
  @media screen and (min-width: 1050px) {
    width: 50%;
  }
  &__title{
    font-size: 24px;
    margin: 0;
  }
}
</style>
