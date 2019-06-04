<template>
  <div class="container">
    <div class="container__inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseContainer',
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: relative;
  &__inner {
    margin: 30px 90px;
    @media screen and (max-width: 768px) {
      margin: 70px 10px;
      height: 100vh;
    }
  }
}
</style>
