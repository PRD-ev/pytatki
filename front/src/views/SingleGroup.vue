<template>
  <base-container @click.native.capture="hideContextMenu" @contextmenu.native="hideContextMenu">
    <current-location
      @change-location="changeLocation"
      :location="currentDirectory"
    />
    <context-menu
      class="pliki"
      @rename-note-init="renameNoteInit"
      :note="selectedFile"
      :clickPosition="clickPosition"
    >
    <file
        @rename-note="renameNote"
        @open-context-menu="showContextMenu"
        :key="folder.id"
        v-for="folder in folders"
        type="folder"
        :title="folder.title"
        :renaming="folder.title === selectedFile.title && renaming"
        :id="folder.id"
      />
      <file
        @rename-note="renameNote"
        @open-context-menu="showContextMenu"
        :key="note.id"
        v-for="note in notes"
        :type="note.type"
        :title="note.title"
        :renaming="note.title === selectedFile.title && renaming"
        :id="note.id"
      />
    </context-menu>
    <base-modal>
      <template v-slot:modal-content>
        <div class="add-note-container">
          <div class="note-type-container">
            <file type="folder" size="tiny" class="negative-margin" />
            <p class="add-note-desc">Folder</p>
          </div>
          <div class="note-type-container">
            <file size="tiny" class="negative-margin" type="download" />
            <p class="add-note-desc">Plik do pobrania</p>
          </div>
          <div class="note-type-container">
            <file size="tiny" class="negative-margin" type="pytatki" />
            <p class="add-note-desc">Notatka</p>
          </div>
          <div class="note-type-container">
            <file size="tiny" class="negative-margin" type="external" />
            <p class="add-note-desc">Notatka zewnętrzna</p>
          </div>
        </div>
      </template>
      <template v-slot:trigger>
        <floating-button>
          <img src="@/assets/icons/plus.svg" alt="plus" />
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
          title: 'Grupa Krzysia3',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
          type: 'external',
        },
      ],
      folders: [],
      selectedFile: { title: '' },
      clickPosition: { x: 0, y: 0 },
      renaming: false,
      currentDirectory: ['Sieci', 'Dział II', 'Projekt'],
    };
  },
  methods: {
    showContextMenu(title, type, event) {
      this.renaming = false;
      this.selectedFile.title = title;
      this.selectedFile.type = type;
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
      const renamedNote = this.notes.find(note => note.title === oldName);
      renamedNote.title = newName;
      this.selectedFile.title = '';
    },
    changeLocation(newLocation) {
      const indexOfNewLocation = this.currentDirectory.indexOf(newLocation);
      this.currentDirectory = this.currentDirectory.slice(0, indexOfNewLocation + 1);
    },
  },
  mounted() {
    fetch('http://localhost:4000/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        operationName: null,
        variables: {},
        query: `{
            group(id: "${this.$route.params.id}"){
              name,
              notes{
                id,
                title,
                type,
                parentFolder{
                  title,
                }
              },
              folders{
                id,
                title,
                parentFolder{
                  title,
                }
              }
            }
          }`,
      }),
    })
      .then(res => res.json())
      .then(({ data }) => {
        this.folders = data.group.folders;
        this.notes = data.group.notes;
        this.currentDirectory = [data.group.name];
      });
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
