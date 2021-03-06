<template>
  <div>
    <!-- File symbol only -->
    <div class="drop-shadow file" v-if="id===undefined">
      <div class="file__symbol" :class="size?`symbol--${size}`:''">
        <img
          v-if="type==='DOWNLOAD'"
          class="file-type"
          src="@/assets/icons/download-fill.svg"
          alt="pobierz"
        />
        <img
          v-if="type==='EXTERNAL'"
          class="file-type"
          src="@/assets/icons/link.svg"
          alt="notatka zewnętrzna"
        />
        <img
          v-if="type==='PYTATKI'"
          class="file-type"
          src="@/assets/icons/quill-pen-fill.svg"
          alt="notatka"
        />
      </div>
    </div>
    <!-- Folder file type-->
    <div v-else-if="type==='FOLDER'" class="folder" @contextmenu.prevent="openContextMenu">
      <div class="drop-shadow" @click="$emit('open-folder', id)">
        <div class="folder__symbol" :class="size?`symbol--${size}`:''"></div>
      </div>
      <span v-if="!renaming">{{title}}</span>
      <base-input v-else v-model="newTitle" />
    </div>
    <!-- Pytatki file type -->
    <div @contextmenu.prevent="openContextMenu" v-else-if="type==='PYTATKI'" class="file">
      <router-link :to="`/note/${id}`">
        <div class="drop-shadow">
          <div class="file__symbol" :class="size?`symbol--${size}`:''">
            <img class="file-type" src="@/assets/icons/quill-pen-fill.svg" alt="notatka" />
          </div>
        </div>
      </router-link>
      <span v-if="!renaming">{{title}}</span>
      <base-input v-else v-model="newTitle" />
    </div>
    <!-- External file type -->
    <div
      @contextmenu.prevent="openContextMenu"
      class="drop-shadow file"
      v-else-if="type==='EXTERNAL'"
    >
      <a :href="link" target="_blank">
        <div class="file__symbol" :class="size?`symbol--${size}`:''">
          <img class="file-type" src="@/assets/icons/link.svg" alt="notatka zewnętrzna" />
        </div>
      </a>
      <span v-if="!renaming">{{title}}</span>
      <base-input v-else v-model="newTitle" />
    </div>
    <!-- Download file type -->
    <div
      @contextmenu.prevent="openContextMenu"
      class="drop-shadow file"
      v-else-if="type==='DOWNLOAD'"
    >
      <div class="file__symbol" :class="size?`symbol--${size}`:''">
        <img class="file-type" src="@/assets/icons/download-fill.svg" alt="pobierz" />
      </div>
      <span v-if="!renaming">{{title}}</span>
      <base-input v-else v-model="newTitle" />
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
    author: String,
    link: String,
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
      this.$emit(
        'open-context-menu',
        {
          id: this.id,
          title: this.title,
          type: this.type,
          author: this.author,
        },
        event,
      );
    },
    renameNote(event) {
      const key = event.which || event.keyCode;
      if (event.target.nodeName !== 'INPUT' || key === 13) {
        this.$emit('rename-note', this.id, this.newTitle);
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
