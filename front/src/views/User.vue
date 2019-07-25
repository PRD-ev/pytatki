<template>
  <base-container>
  <current-location/>
  </base-container>
</template>

<script>
import Vue from 'vue';
import BaseContainer from '@/components/BaseContainer.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';

export default Vue.extend({
  name: 'user',
  components: {
    BaseContainer,
    CurrentLocation,
  },
});
</script>

<style lang="scss" scoped>
</style>
