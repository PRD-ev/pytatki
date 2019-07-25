<template>
  <button :style="`right:${right?right:'30px'}`" class="floating-button">
    <slot></slot>
  </button>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'FloatingButton',
  props: {
    right: String,
  },
});
</script>

<style scoped lang="scss">
.floating-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 30px;
  right: 30px;
  color: var(--white);
  cursor: pointer;
  border: none;
  box-shadow: var(--box-shadow);
  background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
}
</style>
