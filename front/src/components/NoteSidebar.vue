<template>
  <aside class="note-sidebar" :class="sidebarClasses">
    <div v-if="!sidebarAlwaysOn && !sidebarShow" @click="showSidebar" class="show-note-info">
      <img src="@/assets/icons/information-line.svg" alt="file information">
    </div>
    <div v-if="!sidebarAlwaysOn" @click="hideSidebar" class="hide-note-info">
      <img src="@/assets/icons/close.svg" alt="file information">
    </div>
    <p class="note-title">Testowa notatka</p>
    <note-sidebar-date date="13 mar 2019"/>
    <note-sidebar-event person="Filip Wachowiak" event="utworzył notatkę" time="10:39"/>
    <note-sidebar-comment
      person="Filip Wachowiak"
      content="Dlaczego tworzył notatkę?"
      time="10:39"
    />
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
  props: {
    sidebarAlwaysOn: Boolean,
  },
  data() {
    return {
      sidebarShow: false,
    };
  },
  computed: {
    sidebarClasses() {
      const classList = [];
      if (!this.sidebarAlwaysOn) {
        classList.push('note-sidebar--not-always-on');
      }
      if (this.sidebarShow) {
        classList.push('note-sidebar--show');
      }
      return classList.join(' ');
    },
  },
  methods: {
    showSidebar() {
      this.sidebarShow = true;
    },
    hideSidebar() {
      this.sidebarShow = false;
    },
  },
});
</script>


<style lang="scss" scoped>
.show-note-info {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    top: 80px;
  }
}
.hide-note-info {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 35px;
  height: 35px;
  cursor: pointer;
}
.note-title {
  font-size: 32px;
  text-align: center;
}
.note-sidebar {
  position: relative;
  width: 295px;
  height: 100vh;
  overflow: hidden auto;
  background-color: var(--light-gray);
  padding: 30px;
  flex-shrink: 0;
  z-index: 2;
  &--not-always-on {
    position: fixed;
    top: 0;
    right: -295px;
  }
  &--show {
    transform: translateX(-295px);
  }
}
</style>
