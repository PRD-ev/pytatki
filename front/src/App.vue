<template>
  <div id="app">
    <Header />
    <router-view />
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
  --superlight-orange: #ffdeb0;
  --gray: #dcdcdc;
  --light-gray: #eaeaea;
  --dark-gray: #747474;
  --black: #202020;
  --white: #fff;
  --red: #ed5252;
  --light-red: #f68888;
  --box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
::selection {
  background-color: rgba(255, 151, 79, 0.3);
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
.desktop-only {
  @media (max-width: 768px) {
    display: none !important;
  }
}
.mobile-only {
  @media (min-width: 769px) {
    display: none !important;
  }
}

.v-hidden {
  visibility: hidden;
}

.color-orange {
  color: var(--orange);
}

.italic {
  font-style: italic;
}

.ProseMirror {
  font-weight: 300;
  &-focused {
    outline: none;
  }
  strong {
    font-weight: 500;
  }
  code {
    background-color: var(--black);
    color: var(--white);
    display: inline-flex;
    padding: 5px 10px;
    border-radius: 10px;
    line-height: 190%;
  }
  blockquote {
    border-left: 4px solid var(--gray);
    padding: 1px 15px;
    color: var(--dark-gray);
  }
}
input[type='submit'] {
  font-size: 18px;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 10px;
  width: 100%;
  color: var(--white);
  cursor: pointer;
  border: none;
  background: linear-gradient(90deg, var(--orange) 0%, var(--light-orange) 100%);
  box-shadow: var(--box-shadow);
}
</style>
