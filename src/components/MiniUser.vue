<template>
  <div class="mini-user">
    <img src="../assets/Filip.jpg" alt="">
    <p>Filip Wachowiak</p>
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'MiniUser',
});
</script>

<style scoped lang="scss">
.mini-user{
  display: flex;
  align-items: center;
}
img{
  height: 55px;
  border-radius: 50%;
  margin-right: 15px;
}
@media (max-width: 768px) {
  p{
    font-size: 24px;
  }
  img{
    height: 70px;
    margin-right: 20px;
  }
}
</style>
