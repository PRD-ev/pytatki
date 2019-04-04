<template>
  <div :class="buttonClass.join(' ')">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Btn',
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
    if (this.color === 'red') {
      this.buttonClass.push('button--red');
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
  &--red {
    background: linear-gradient(90deg, var(--red) 0%, var(--light-red) 100%);
  }
}
</style>
