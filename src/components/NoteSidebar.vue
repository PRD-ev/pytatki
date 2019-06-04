<template>
  <aside class="note-sidebar">
    <h1>Testowa notatka</h1>
    <note-sidebar-date/>
    <note-sidebar-event/>
    <note-sidebar-comment/>
    <note-sidebar-new-comment/>
  </aside>
</template>


<script>
import Vue from 'vue';
import NoteSidebarComment from '@/components/NoteSidebarComment.vue';
import NoteSidebarNewComment from '@/components/NoteSidebarNewComment.vue';
import NoteSidebarDate from '@/components/NoteSidebarDate.vue';
import NoteSidebarEvent from '@/components/NoteSidebarEvent.vue';

export default Vue.extend({
  name: 'NoteSidebar',
  components: {
    NoteSidebarComment,
    NoteSidebarNewComment,
    NoteSidebarDate,
    NoteSidebarEvent,
  },
});
</script>


<style lang="scss" scoped>
.note-sidebar {
  width: 275px;
  background-color: var(--light-gray);
}
</style>
