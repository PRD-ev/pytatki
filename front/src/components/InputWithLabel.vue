<template>
  <label class="base-label" for>
    <slot></slot>
    <base-input @input="(payload)=>$emit('input',payload)" :length="length" :value="value"></base-input>
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
    value: String,
  },
});
</script>

<style lang="scss" scoped>
.base-label {
  margin: 5px 0;
  color: var(--black);
  display: inline-block;
  width: 100%;
}
</style>
