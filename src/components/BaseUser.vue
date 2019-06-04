<template>
  <img class="base-user" :class="`base-user--${size}`" src="../assets/Filip.jpg" alt>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseUser',
  props: {
    size: String,
  },
});
</script>

<style scoped>
.base-user {
  height: 55px;
  width: auto;
  border-radius: 50%;
  margin-right: 15px;
}
.base-user--medium {
  height: 125px;
}
.base-user--small {
  height: 40px;
}
@media (max-width: 768px) {
  .base-user {
    height: 65px;
    margin-right: 20px;
  }
  .base-user--medium {
    height: 125px;
  }
  .base-user--small {
    height: 40px;
  }
}
</style>
