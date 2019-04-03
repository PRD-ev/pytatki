<template>
  <header>
    <router-link to="/">
      <Logo/>
    </router-link>
    <nav>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="/img/icons/group-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="/img/icons/group-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="/img/icons/heart-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="/img/icons/file-text-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="/img/icons/logout-box-fill.svg">Dashboard
      </router-link>
    </nav>
    <div>
      <img src="" alt="">
      <p>Filip Wachowiak</p>
    </div>
    <div class="external-links">
      <a href target="_blank">
        <img class="external-link__image" src="/img/icons/github-fill.svg">
      </a>
      <a href target="_blank">
        <img class="external-link__image" src="/img/icons/facebook-box-fill.svg">
      </a>
      <a href target="_blank">
        <img class="external-link__image" src="/img/icons/medium-fill.svg">
      </a>
      <a href target="_blank">
        <img class="external-link__image" src="/img/icons/bug-fill.svg">
      </a>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/Logo.vue';

export default Vue.extend({
  name: 'Header',
  components: {
    Logo,
  },
});
</script>

<style scoped lang="scss">
header {
  height: 100vh;
  padding: 40px 50px;
  width: 250px;
}
nav {
  display: flex;
  flex-direction: column;
}

.menu-item__image{
  height: 23px;
}
.external-links{
  display: flex;
  justify-content: space-between;
}
.external-link__image{
  height: 24px;
}

</style>
