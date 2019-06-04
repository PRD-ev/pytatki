<template>
  <div>
    <base-user/>
    <div>Patryk skomentował 9:30</div>treść
  </div>
</template>


<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';

export default Vue.extend({
  name: 'NoteSidebarComment',
  components: {
    BaseUser,
  },
});
</script>


<style lang="scss" scoped>
</style>
