<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
  },
});
</script>


<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
}
body {
  margin: 0;
}
</style>
