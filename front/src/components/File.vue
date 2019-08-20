<template>
  <div>
    <div v-if="type==='FOLDER'" class="folder" @contextmenu.prevent="openContextMenu">
      <div class="drop-shadow">
        <div class="folder__symbol" :class="size?`symbol--${size}`:''"></div>
      </div>
      <span v-if="!renaming">{{title}}</span>
      <base-input v-else v-model="newName" />
    </div>
    <router-link
      :to="`/note/${id}`"
      v-else-if="id!==undefined"
      class="file"
      @contextmenu.prevent="openContextMenu"
    >
      <div class="drop-shadow">
        <div class="file__symbol" :class="size?`symbol--${size}`:''">
          <img
            v-if="type==='EXTERNAL'"
            class="file-type"
            src="@/assets/icons/link.svg"
            alt="notatka zewnętrzna"
          />
          <img
            v-if="type==='DOWNLOAD'"
            class="file-type"
            src="@/assets/icons/download-fill.svg"
            alt="pobierz"
          />
          <img
            v-if="type==='PYTATKI'"
            class="file-type"
            src="@/assets/icons/quill-pen-fill.svg"
            alt="notatka"
          />
        </div>
      </div>
      <span v-if="!renaming">{{title}}</span>
      <base-input v-else v-model="newName" />
    </router-link>
    <div class="drop-shadow" v-else>
      <div class="file__symbol" :class="size?`symbol--${size}`:''">
        <img
          v-if="type==='EXTERNAL'"
          class="file-type"
          src="@/assets/icons/link.svg"
          alt="notatka zewnętrzna"
        />
        <img
          v-if="type==='DOWNLOAD'"
          class="file-type"
          src="@/assets/icons/download-fill.svg"
          alt="pobierz"
        />
        <img
          v-if="type==='PYTATKI'"
          class="file-type"
          src="@/assets/icons/quill-pen-fill.svg"
          alt="notatka"
        />
      </div>
    </div>
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
    title: String,
    type: {
      type: String,
      required: true,
      validator: type => ['DOWNLOAD', 'PYTATKI', 'EXTERNAL', 'FOLDER'].indexOf(type) !== -1,
    },
    size: {
      type: String,
      validator: size => size === 'tiny',
    },
    renaming: Boolean,
    id: String,
  },
  data() {
    return {
      newTitle: this.title,
    };
  },
  updated() {
    if (this.renaming === true) {
      window.addEventListener('click', this.renameNote, { capture: true });
      window.addEventListener('keypress', this.renameNote);
    }
  },
  methods: {
    openContextMenu(event) {
      event.stopPropagation();
      this.$emit('open-context-menu', this.title, this.type, event);
    },
    renameNote(event) {
      const key = event.which || event.keyCode;
      if (event.target.nodeName !== 'INPUT' || key === 13) {
        this.$emit('rename-note', this.title, this.newName);
        window.removeEventListener('click', this.renameNote, { capture: true });
        window.removeEventListener('keypress', this.renameNote);
      }
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

.drop-shadow {
  filter: drop-shadow(var(--box-shadow));
}
</style>
