<template>
  <base-container>
    <div class="home">home</div>
  </base-container>
</template>

<script>
import Vue from 'vue';
import BaseContainer from '@/components/BaseContainer.vue';

export default Vue.extend({
  name: 'home',
  components: {
    BaseContainer,
  },
});
</script>
