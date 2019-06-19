<template>
  <div class="note-comment">
    <div>
      <p class="note-comment__text">
        <b>{{person}}</b>
        skomentował.
        <span class="note-comment__time">{{time}}</span>
      </p>
      <p class="note-comment__content">{{content}}</p>
    </div>
    <base-user size="small"/>
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
  props: {
    person: {
      required: true,
      type: String,
    },
    content: {
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
.note-comment {
  display: flex;
  padding: 20px 15px 5px 15px;
  margin: 15px 0 15px -15px;
  background-color: var(--white);
  box-shadow: var(--box-shadow);
  border-radius: 10px;
  &__content,
  &__text {
    font-size: 14px;
  }
  &__text {
    margin-top: 0;
    margin-right: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--gray);
  }
  &__time {
    font-size: 12px;
    color: var(--dark-gray);
  }
}
</style>
