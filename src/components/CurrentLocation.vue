<template>
    <h1 class="current-location desktop-only">
      {{$route.name}}
    </h1>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'CurrentLocation',
});
</script>

<style scoped lang="scss">
.current-location{
  font-size: 30px;
  text-transform: capitalize;
  margin-bottom: 0;
  font-weight: 500;
}
</style>
