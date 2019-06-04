<template>
  <div>
    <p>Filip Wachowiak uutworzył notatkę 10:25</p>
    <base-user/>
  </div>
</template>


<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';

export default Vue.extend({
  name: 'NoteSidebarEvent',
  components: {
    BaseUser,
  },
});
</script>


<style lang="scss" scoped>
</style>
