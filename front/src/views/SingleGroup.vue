<template>
  <base-container @click.native.capture="hideContextMenu" @contextmenu.native="hideContextMenu">
    <current-location
      @change-location="changeLocation"
      :location="[$store.state.currentGroup.name, ...currentDirectory]"
    />
    <context-menu
      class="pliki"
      @rename-note-init="renameNoteInit"
      :note="selectedNote"
      :clickPosition="clickPosition"
    >
      <file
        @rename-note="renameNote"
        @open-context-menu="showContextMenu"
        :key="note.name"
        v-for="note in notes"
        :type="note.type"
        :name="note.name"
        :renaming="note.name === selectedNote.name && renaming"
      />
    </context-menu>
    <base-modal>
      <template v-slot:modal-content>
        <div class="add-note-container">
          <div class="note-type-container">
            <file type="folder" size="tiny" class="negative-margin"/>
            <p class="add-note-desc">Folder</p>
          </div>
          <div class="note-type-container">
            <file size="tiny" class="negative-margin" type="download"/>
            <p class="add-note-desc">Plik do pobrania</p>
          </div>
          <div class="note-type-container">
            <file size="tiny" class="negative-margin" type="pytatki"/>
            <p class="add-note-desc">Notatka</p>
          </div>
          <div class="note-type-container">
            <file size="tiny" class="negative-margin" type="external"/>
            <p class="add-note-desc">Notatka zewnętrzna</p>
          </div>
        </div>
      </template>
      <template v-slot:trigger>
        <floating-button>
          <img src="@/assets/icons/plus.svg" alt="plus">
        </floating-button>
      </template>
    </base-modal>
  </base-container>
</template>

<script>
import Vue from 'vue';
import File from '@/components/File.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import ContextMenu from '@/components/ContextMenu.vue';

export default Vue.extend({
  name: 'singleGroup',
  components: {
    File,
    CurrentLocation,
    BaseContainer,
    FloatingButton,
    BaseModal,
    ContextMenu,
  },
  data() {
    return {
      notes: [
        {
          name: 'Johny Krzaczek3',
          image:
            'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300',
          type: 'folder',
        },
        {
          name: 'Elita Przybylskiego3',
          image:
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300',
          type: 'folder',
        },
        {
          name: 'Grupa Krzysia',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
          type: 'download',
        },
        {
          name: 'Johny Krzaczek',
          image:
            'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300',
          type: 'download',
        },
        {
          name: 'Elita Przybylskiego',
          image:
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300',
          type: 'external',
        },
        {
          name: 'Grupa Krzysia2',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
          type: 'pytatki',
        },
        {
          name: 'Johny Krzaczek2',
          image:
            'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300',
          type: 'pytatki',
        },
        {
          name: 'Elita Przybylskiego2',
          image:
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300',
          type: 'pytatki',
        },
        {
          name: 'Grupa Krzysia3',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
          type: 'external',
        },
      ],
      selectedNote: { name: '' },
      clickPosition: { x: 0, y: 0 },
      renaming: false,
      currentDirectory: ['Sieci', 'Dział II', 'Projekt'],
    };
  },
  methods: {
    showContextMenu(name, type, event) {
      this.renaming = false;
      this.selectedNote.name = name;
      this.selectedNote.type = type;
      this.clickPosition.x = event.clientX;
      this.clickPosition.y = event.clientY;
    },
    hideContextMenu() {
      this.clickPosition.x = 0;
      this.clickPosition.y = 0;
    },
    renameNoteInit() {
      this.renaming = true;
    },
    renameNote(oldName, newName) {
      this.renaming = false;
      const renamedNote = this.notes.find(note => note.name === oldName);
      renamedNote.name = newName;
      this.selectedNote.name = '';
    },
    changeLocation(newLocation) {
      const indexOfNewLocation = this.currentDirectory.indexOf(newLocation);
      this.currentDirectory = this.currentDirectory.slice(0, indexOfNewLocation + 1);
    },
  },
});
</script>

<style lang="scss" scoped>
.pliki {
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.add-note-container {
  display: flex;
  flex-direction: column;
  .negative-margin {
    margin: -5px;
  }
}
.add-note-desc {
  margin: 0 0 0 20px;
  &:first-child {
    margin-left: 11px;
  }
}
.note-type-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>