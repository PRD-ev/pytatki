<template>
  <div class="floating-button">
    <slot></slot>
  </div>
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
  background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
}
</style>
