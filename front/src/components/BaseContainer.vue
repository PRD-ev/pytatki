<template>
  <div class="container">
    <div class="container__inner">
      <div v-if="$store.state.user.id!==undefined">
        <slot></slot>
      </div>
      <div class="flex-center" v-else>
        <div>
          <p>Zaloguj się aby mieć dostęp do zawartości</p>
          <p>Nie masz jeszcze konta?</p>
          <register-modal />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import RegisterModal from '@/components/RegisterModal.vue';

export default Vue.extend({
  name: 'BaseContainer',
  components: {
    RegisterModal,
  },
});
</script>

<style scoped lang="scss">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
}
.container {
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: relative;
  &__inner {
    margin: 30px 90px;
    @media screen and (max-width: 768px) {
      margin: 70px 10px;
      height: 100vh;
    }
  }
}
</style>
