<template>
  <div class="mini-user">
    <base-user/>
    <p class="mini-user__text">Filip Wachowiak</p>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';

export default Vue.extend({
  name: 'MiniUser',
  components: {
    BaseUser,
  },
});
</script>

<style scoped lang="scss">
.mini-user {
  display: flex;
  align-items: center;
}
@media (max-width: 768px) {
  .mini-user__text {
    font-size: 22px;
  }
}
</style>
