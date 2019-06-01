<template>
  <label for>
    <slot></slot>
    <base-input></base-input>
  </label>
</template>

<script>
import Vue from 'vue';
import BaseInput from '@/components/BaseInput.vue';

export default Vue.extend({
  name: 'InputWithLabel',
  components: {
    BaseInput,
  },
});
</script>

<style>
</style>
