<template>
  <div>
    <div class="top-mobile-bar mobile-only">
      <div class="open-menu" @click="openMenu">
        <img src="../assets/icons/hamburger.svg" alt="hamburger icon to open menu">
      </div>
      <p class="current-location">{{$route.name}}</p>
    </div>
    <header v-show="this.menuIsOpen">
      <div class="close-menu mobile-only" @click="closeMenu">
        <img src="../assets/icons/close.svg" alt="cross icon to close menu">
      </div>
      <router-link @click.native="closeMenu" to="/">
        <logo class="desktop-only"/>
      </router-link>
      <nav>
        <router-link @click.native="closeMenu" to="/groups">
          <img class="menu-item__image" src="../assets/icons/group-fill.svg">
          Grupy
        </router-link>
        <router-link @click.native="closeMenu" to="/group">
          <img class="menu-item__image" src="../assets/icons/heart-fill.svg">
          Grupa
        </router-link>
        <router-link @click.native="closeMenu" to="/settings">
          <img class="menu-item__image" src="../assets/icons/file-text-fill.svg">
          Ustawienia
        </router-link>
        <router-link @click.native="closeMenu" to="/note">
          <img class="menu-item__image" src="../assets/icons/logout-box-fill.svg">
          Notatka
        </router-link>
      </nav>
      <div class="header-bottom">
        <router-link v-if="$store.state.user.id" @click.native="closeMenu" to="/user">
          <mini-user/>
        </router-link>
        <login-modal v-else/>
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

<script>
import Vue from 'vue';
import Logo from '@/components/Logo.vue';
import MiniUser from '@/components/MiniUser.vue';
import LoginModal from '@/components/LoginModal.vue';


const isMobile = window.innerWidth < 769;

export default Vue.extend({
  name: 'Header',
  components: {
    Logo,
    MiniUser,
    LoginModal,
  },
  data() {
    return {
      menuIsOpen: !isMobile,
    };
  },
  methods: {
    closeMenu() {
      if (isMobile === true) {
        this.menuIsOpen = false;
      }
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
  cursor: pointer;
  position: fixed;
  top: 6px;
  left: 6px;
  padding: 15px;
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
  height: 63px;
  background: linear-gradient(90deg, var(--orange) 0%, var(--light-orange) 100%);
  z-index: 1;
}
.current-location {
  margin-left: 70px;
  font-size: 24px;
  font-weight: 500;
  z-index: 1;
  text-transform: capitalize;
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
  background: linear-gradient(180deg, var(--orange) 15%, var(--light-orange) 100%);
  color: var(--white);
  box-shadow: 1px 0px 10px rgba(0, 0, 0, 0.25);
  z-index: 3;
  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    padding: 40px 20vw;
  }
}
nav {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    margin-top: 20px;
  }

  a {
    margin: 10px 0;
    @media (max-width: 768px) {
      font-size: 25px;
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
