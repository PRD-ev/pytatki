<template>
  <h1 v-if="location===undefined" class="current-location desktop-only">{{$route.name}}</h1>
  <h1 v-else class="current-location italic desktop-only">
    <span
      class="current-location__entry"
      @click="$emit('change-location', directory)"
      :key="index"
      v-for="(directory, index) in location"
    >{{parentLocationWithSlashes[index]}}</span>
    <span class="color-orange">{{location[location.length-1].name}}</span>
  </h1>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'CurrentLocation',
  props: {
    location: Array,
  },
  computed: {
    parentLocationWithSlashes() {
      return this.location.slice(0, this.location.length - 1).map(location => `${location.name} / `);
    },
  },
});
</script>

<style scoped lang="scss">
.current-location {
  font-size: 30px;
  text-transform: capitalize;
  margin-bottom: 0;
  font-weight: 500;
  &__entry {
    cursor: pointer;
  }
}
</style>
