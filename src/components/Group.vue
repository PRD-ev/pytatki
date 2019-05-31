<template>
  <div class="group">
    <div :style="`background-image: url('${image}');`" class="group__circle"></div>
    {{name}}
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'Group',
  props: {
    name: String,
    image: String,
  },
});
</script>

<style scoped lang="scss">
.group {
  text-align: center;
  font-size: 22px;
  margin: 20px;
}
.group__circle {
  width: 140px;
  height: 140px;
  background-size: cover;
  border-radius: 50%;
  border: 3px solid var(--orange);
  margin: 20px auto;
}
</style>
