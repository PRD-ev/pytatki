<template>
  <div class="note-event">
    <p class="note-event__text">
      <b>{{person}}</b>
      {{event}}.
      <span class="note-event__time">{{time}}</span>
    </p>
    <base-user size="small"/>
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
  props: {
    person: {
      required: true,
      type: String,
    },
    event: {
      required: true,
      type: String,
    },
    time: {
      required: true,
      type: String,
    },
  },
});
</script>


<style lang="scss" scoped>
.note-event {
  display: flex;
  align-items: center;
  margin: 15px 0;
  &__text {
    font-size: 14px;
    margin-right: 15px;
  }
  &__time {
    font-size: 12px;
    color: var(--dark-gray);
  }
}
</style>
