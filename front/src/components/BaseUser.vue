<template>
  <img class="base-user" :class="size?`base-user--${size}`:''" :src="image" alt>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseUser',
  props: {
    size: {
      type: String,
      validator: size => size === 'small' || size === 'medium' || size === 'tiny',
    },
    image: {
      type: String,
      required: true,
    },
  },
});
</script>

<style scoped>
.base-user {
  height: 55px;
  width: auto;
  border-radius: 50%;
}
.base-user--medium {
  height: 125px;
}
.base-user--small {
  height: 40px;
}
.base-user--tiny {
  height: 30px;
}

@media (max-width: 768px) {
  .base-user {
    height: 65px;
  }
  .base-user--medium {
    height: 125px;
  }
  .base-user--small {
    height: 40px;
  }
  .base-user--tiny {
    height: 30px;
  }
}
</style>
