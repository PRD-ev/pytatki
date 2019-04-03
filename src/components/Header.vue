<template>
  <header>
    <router-link to="/">
      <logo/>
    </router-link>
    <nav>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="../assets/icons/group-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="../assets/icons/group-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="../assets/icons/heart-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="../assets/icons/file-text-fill.svg">Dashboard
      </router-link>
      <router-link to="/dashboard">
        <img class="menu-item__image" src="../assets/icons/logout-box-fill.svg">Dashboard
      </router-link>
    </nav>
    <div class="header-bottom">
      <mini-user/>
      <div class="external-links">
        <a href="https://github.com/prd-ev/pytatki-front" target="_blank" rel="nofollow">
          <img class="external-link__image" src="../assets/icons/github-fill.svg">
        </a>
        <a href="https://www.facebook.com/Pytatki-583687131990579/" target="_blank" rel="nofollow">
          <img class="external-link__image" src="../assets/icons/facebook-box-fill.svg">
        </a>
        <a href target="_blank" rel="nofollow">
          <img class="external-link__image" src="../assets/icons/medium-fill.svg">
        </a>
        <a href target="_blank" rel="nofollow">
          <img class="external-link__image" src="../assets/icons/bug-fill.svg">
        </a>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';
import Logo from '@/components/Logo.vue';
import MiniUser from '@/components/MiniUser.vue';

export default Vue.extend({
  name: 'Header',
  components: {
    Logo,
    MiniUser,
  },
});
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  padding: 40px 50px;
  width: 275px;
  background: linear-gradient(
    180deg,
    var(--orange) 15%,
    var(--light-orange) 100%
  );
  color: var(--white);
  @media(max-width: 768px){
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
  }
}
nav {
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  a {
    margin: 10px 0;
  }
}
.menu-item__image {
  height: 23px;
  margin-right: 15px;
  vertical-align: bottom;
}
.header-bottom {
  margin-top: auto;
}
.mini-user {
  margin-bottom: 50px;
}
.external-links {
  display: flex;
  justify-content: space-between;
}
.external-link__image {
  height: 24px;
}
</style>
