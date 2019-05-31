<template>
  <div :class="buttonClass.join(' ')">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseButton',
  props: {
    size: String,
    color: String,
  },
  data() {
    return {
      buttonClass: ['button'],
    };
  },
  created() {
    if (this.size === 'huge') {
      this.buttonClass.push('button--huge');
    } else if (this.size === 'large') {
      this.buttonClass.push('button--large');
    }
  },
});
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 5px 25px;
  color: var(--white);
  cursor: pointer;
  background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
  &--large {
    padding: 10px 25px;
  }
  &--huge {
    padding: 10px 25px;
    height: 100px;
    width: 250px;
  }
}
</style>
