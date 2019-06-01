<template>
  <div class="settings-group">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'SettingsGroup',
});
</script>

<style>
.settings-group{
  border: solid 1px var(--orange);
  border-radius: 10px;
  padding: 25px;
  margin: 25px 0;
}
</style>
