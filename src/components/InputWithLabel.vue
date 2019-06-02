<template>
  <label class="base-label" for>
    <slot></slot>
    <base-input :length="length"></base-input>
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
  props: {
    length: String,
  },
});
</script>

<style lang="scss" scoped>
.base-label {
  margin: 10px 0;
  color: var(--dark-gray);
}
</style>
