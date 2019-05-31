<template>
  <div class="folder">
    <div class="folder__symbol"></div>
    {{name}}
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Folder',
  props: {
    name: String,
  },
});
</script>

<style scoped lang="scss">
.folder {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  margin: 20px 20px 0;
  &__symbol {
    margin: 20px;
    height: 85px;
    width: 105px;
    clip-path: polygon(0 0, 35% 0, 55% 15%, 100% 15%, 100% 100%, 0 100%);
    background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
  }
}
</style>
