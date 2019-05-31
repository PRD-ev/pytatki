<template>
  <div class="file">
    <div class="file__symbol">
      {{type==="external"?"piórko":type=="download"?"pobieranie":"pytatki"}}
    </div>
    {{name}}
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'File',
  props: {
    name: String,
    type: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.file {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  margin: 20px 20px 0;
  &__symbol {
    margin: 20px;
    height: 95px;
    width: 75px;
    clip-path: polygon(0 0, 70% 0, 100% 23%, 100% 100%, 0 100%);
    background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
  }
}
</style>
