<template>
  <button :class="buttonClass.join(' ')">
    <slot></slot>
  </button>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButton',
  props: {
    size: {
      type: String,
      validator: size => size === 'huge',
    },
  },
  data() {
    return {
      buttonClass: ['button'],
    };
  },
  created() {
    if (this.size === 'huge') {
      this.buttonClass.push('button--huge');
    }
  },
});
</script>

<style scoped lang="scss">
.button {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 7px 15px;
  margin: 10px;
  width: 100%;
  color: var(--white);
  cursor: pointer;
  border: none;
  background: linear-gradient(90deg, var(--orange) 0%, var(--light-orange) 100%);
  &--huge {
    padding: 10px 25px;
    height: 100px;
    width: 250px;
  }
}
</style>
