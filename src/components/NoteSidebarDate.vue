<template>
  <div class="note-date">
    <p class="note-date__text">{{date}}</p>
    <div class="note-date__line"></div>
  </div>
</template>


<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'NoteSidebarDate',
  props: {
    date: String,
  },
});
</script>


<style lang="scss" scoped>
.note-date {
  display: flex;
  color: var(--orange);
  align-items: center;
  transform: translateX(35px);
  &__text {
    width: 55%;
    font-size: 12px;
  }
  &__line {
    height: 0;
    border: 1px solid var(--orange);
    vertical-align: middle;
    width: 100%;
    position: relative;
    &::before {
      position: absolute;
      top: -4px;
      left: -4px;
      content: '';
      display: block;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background-color: var(--orange);
    }
  }
}
</style>
