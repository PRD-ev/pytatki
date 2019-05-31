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
  name: 'dashboard',
  components: {
    BaseContainer,
    CurrentLocation,
  },
});
</script>
