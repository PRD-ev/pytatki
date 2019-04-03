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
:root{
  --orange:#fe9e63;
  --light-orange:#ffba5c;
  --white:#fff;
  --red:#ed5252;
  --light-red:#f68888;
}
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
a{
  color: inherit;
  text-decoration: none;
}
a,p{
  font-size: 18px;
}
</style>
