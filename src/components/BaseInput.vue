<template>
  <input class="base-input" type="text">
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseInput',
});
</script>

<style lang="scss" scoped>
.base-input {
  margin: 5px 0;
  width: 100%;
  height: 30px;
  padding: 5px;
  border: 1px solid var(--gray);
  border-radius: 10px;
}
</style>
