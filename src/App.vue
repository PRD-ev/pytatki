<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
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
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,700');

:root {
  --orange: #fe9e63;
  --light-orange: #ffba5c;
  --white: #fff;
  --red: #ed5252;
  --light-red: #f68888;
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
a {
  color: inherit;
  text-decoration: none;
}
a,
p {
  font-size: 18px;
}
img {
  max-width: 100%;
}
.mobile-only {
  @media (min-width: 769px) {
    display: none !important;
  }
}
</style>
