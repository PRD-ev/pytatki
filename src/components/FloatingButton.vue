<template>
  <button class="floating-button">
    <slot></slot>
  </button>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'FloatingButton',
});
</script>

<style scoped lang="scss">
.floating-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  color: var(--white);
  cursor: pointer;
  border: none;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
  background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
}
</style>
