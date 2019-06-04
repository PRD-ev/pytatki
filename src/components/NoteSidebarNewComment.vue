<template>
  <div>
    <div class="new-comment">
      <base-user size="small"/>
      <div contenteditable="contenteditable" class="new-comment__text"></div>
    </div>
    <base-button class="save-comment">Skomentuj</base-button>
  </div>
</template>


<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';
import BaseButton from '@/components/BaseButton.vue';

export default Vue.extend({
  name: 'NoteSidebarNewComment',
  components: {
    BaseUser,
    BaseButton,
  },
});
</script>


<style lang="scss" scoped>
.new-comment {
  display: flex;
  margin: 15px 0;
  &__text {
    display: block;
    border-radius: 10px;
    background-color: var(--white);
    box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.25);
    padding: 10px;
    word-wrap: break-word;
    width: 190px;
  }
}
.save-comment{
  margin: 15px 0;
}
</style>
