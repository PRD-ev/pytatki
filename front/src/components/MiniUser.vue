<template>
  <div class="mini-user">
    <base-user class="mr-user" :image="$store.state.user.image" />
    <p class="mini-user__text">{{ $store.state.user.name }}</p>
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
.mr-user {
  margin-right: 16px;
}
@media (max-width: 768px) {
  .mini-user__text {
    font-size: 22px;
  }
  .mr-user {
    margin-right: 20px;
  }
}
</style>
