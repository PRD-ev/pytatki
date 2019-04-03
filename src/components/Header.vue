<template>
  <div>
    <div class="top-mobile-bar mobile-only">
      <div class="open-menu" @click="openMenu">
        <img src="../assets/icons/hamburger.svg" alt="hamburger icon to open menu">
      </div>
      <p class="current-location">Current location</p>
    </div>
    <header v-show="this.menuIsOpen">
      <div class="close-menu mobile-only" @click="closeMenu">
        <img src="../assets/icons/close.svg" alt="cross icon to close menu">
      </div>
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
          <a
            href="https://www.facebook.com/Pytatki-583687131990579/"
            target="_blank"
            rel="nofollow"
          >
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
  </div>
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
  data() {
    return {
      menuIsOpen: true,
    };
  },
  methods: {
    closeMenu() {
      this.menuIsOpen = false;
    },
    openMenu() {
      this.menuIsOpen = true;
    },
  },
});
</script>

<style scoped lang="scss">
.close-menu,
.open-menu {
  position: fixed;
  top: 25px;
  left: 25px;
  img {
    width: 20px;
    height: 20px;
  }
}
.top-mobile-bar {
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 67px;
  background: linear-gradient(
    90deg,
    var(--orange) 0%,
    var(--light-orange) 100%
  );
}
.current-location {
  margin-left: 80px;
  font-size: 24px;
  z-index: 1;
  color: var(--white);
}
header {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100vh;
  padding: 40px 50px;
  width: 275px;
  font-weight: 500;
  background: linear-gradient(
    180deg,
    var(--orange) 15%,
    var(--light-orange) 100%
  );
  color: var(--white);
  box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 2;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 40px 20vw;
  }
}
nav {
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 20px;
  }

  a {
    margin: 10px 0;
    @media (max-width: 768px) {
      margin: 20px 0;
      font-size: 30px;
    }
  }
}
.menu-item__image {
  height: 23px;
  margin-right: 15px;
  vertical-align: bottom;
  @media (max-width: 768px) {
    height: 34px;
    margin-right: 20px;
  }
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
