<template>
  <div class="mini-user">
    <img class="mini-user__thumbnail" src="../assets/Filip.jpg" alt>
    <p class="mini-user__text">Filip Wachowiak</p>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'MiniUser',
});
</script>

<style scoped lang="scss">
.mini-user {
  display: flex;
  align-items: center;
}
.mini-user__thumbnail {
  height: 55px;
  border-radius: 50%;
  margin-right: 15px;
}
@media (max-width: 768px) {
  .mini-user__text {
    font-size: 22px;
  }
  .mini-user__thumbnail {
    height: 65px;
    margin-right: 20px;
  }
}
</style>
