<template>
  <div v-if="type==='folder'" class="folder" @contextmenu.prevent="openContextMenu">
    <div class="folder__symbol" :class="size?`symbol--${size}`:''"></div>
    <span v-if="!renaming">{{name}}</span>
    <base-input v-else :value="name"/>
  </div>
  <div v-else class="file" @contextmenu.prevent="openContextMenu">
    <div class="file__symbol" :class="size?`symbol--${size}`:''">
      <img
        v-if="type==='external'"
        class="file-type"
        src="@/assets/icons/link.svg"
        alt="notatka zewnętrzna"
      >
      <img
        v-if="type==='download'"
        class="file-type"
        src="@/assets/icons/download-fill.svg"
        alt="pobierz"
      >
      <img
        v-if="type==='pytatki'"
        class="file-type"
        src="@/assets/icons/quill-pen-fill.svg"
        alt="notatka"
      >
    </div>
    <span v-if="!renaming">{{name}}</span>
    <base-input v-else :value="name"/>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseInput from '@/components/BaseInput.vue';


export default Vue.extend({
  name: 'File',
  components: {
    BaseInput,
  },
  props: {
    name: String,
    type: {
      type: String,
      required: true,
      validator: type => ['download', 'pytatki', 'external', 'folder'].indexOf(type) !== -1,
    },
    size: {
      type: String,
      validator: size => size === 'tiny',
    },
    renaming: Boolean,
  },
  methods: {
    openContextMenu($event) {
      $event.stopPropagation();
      this.$emit('open-context-menu', this.name, this.type, $event);
    },
  },
});
</script>

<style scoped lang="scss">
.file {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  margin: 20px 20px 0;
  &__symbol {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    height: 95px;
    width: 75px;
    clip-path: polygon(0 0, 70% 0, 100% 23%, 100% 100%, 0 100%);
    background: linear-gradient(90deg, var(--orange) 0%, var(--light-orange) 100%);
  }
  .symbol--tiny {
    height: calc(95px * 0.4);
    width: calc(75px * 0.4);
  }
}
.file-type {
  height: 50px;
  max-height: 50%;
}
.folder {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  margin: 20px 20px 0;
  &__symbol {
    margin: 20px;
    height: 85px;
    width: 105px;
    clip-path: polygon(0 0, 35% 0, 55% 15%, 100% 15%, 100% 100%, 0 100%);
    background: linear-gradient(90deg, var(--orange) 0%, var(--light-orange) 100%);
  }
  .symbol--tiny {
    height: calc(85px * 0.4);
    width: calc(105px * 0.4);
  }
}
</style>
