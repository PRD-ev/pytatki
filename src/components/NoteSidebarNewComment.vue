<template>
  <div>
    <base-user/>tekst
  </div>
</template>


<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';

export default Vue.extend({
  name: 'NoteSidebarNewComment',
  components: {
    BaseUser,
  },
});
</script>


<style lang="scss" scoped>
</style>
