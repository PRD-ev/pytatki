<template>
  <base-container>
    test
    <editor-content :editor="editor"/>
  </base-container>
</template>


<script>
import Vue from 'vue';
import BaseContainer from '@/components/BaseContainer.vue';
import { Editor, EditorContent } from 'tiptap';

export default Vue.extend({
  name: 'note',
  components: {
    BaseContainer,
    EditorContent,
  },
   data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>This is just a boring paragraph</p>',
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
});
</script>


<style lang="scss" scoped>
</style>
