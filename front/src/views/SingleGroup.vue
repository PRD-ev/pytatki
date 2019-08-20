<template>
  <base-container @click.native.capture="hideContextMenu" @contextmenu.native="hideContextMenu">
    <current-location @change-location="changeLocation" :location="currentDirectory" />
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
        type="FOLDER"
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
    <base-modal @close-modal="newFileType=null">
      <template v-slot:modal-content>
        <div class="add-note-container" v-if="newFileType===null">
          <div class="note-type-container" @click="newFileType='FOLDER'">
            <file type="FOLDER" size="tiny" class="negative-margin" />
            <p class="add-note-desc">Folder</p>
          </div>
          <div class="note-type-container" @click="newFileType='DOWNLOAD'">
            <file size="tiny" class="negative-margin" type="DOWNLOAD" />
            <p class="add-note-desc">Plik do pobrania</p>
          </div>
          <div class="note-type-container" @click="newFileType='PYTATKI'">
            <file size="tiny" class="negative-margin" type="PYTATKI" />
            <p class="add-note-desc">Notatka</p>
          </div>
          <div class="note-type-container" @click="newFileType='EXTERNAL'">
            <file size="tiny" class="negative-margin" type="EXTERNAL" />
            <p class="add-note-desc">Notatka zewnętrzna</p>
          </div>
        </div>
        <div v-else>
          <input-with-label
            :value="newFileTitle"
            @input.native="newFileTitle = $event.target.value"
          >Nazwa</input-with-label>
          <div v-if="newFileType === 'DOWNLOAD'">
            <label for="file">Plik</label>
            <input id="file" type="file" />
          </div>
          <input-with-label
            v-if="newFileType === 'EXTERNAL'"
            :value="newFileExternalLink"
            @input.native="newFileExternalLink = $event.target.value"
          >Odnośnik</input-with-label>
          <input type="submit" value="Utwórz" @click="createNewFile" />
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
import InputWithLabel from '@/components/InputWithLabel.vue';

export default Vue.extend({
  name: 'singleGroup',
  components: {
    File,
    CurrentLocation,
    BaseContainer,
    FloatingButton,
    BaseModal,
    ContextMenu,
    InputWithLabel,
  },
  data() {
    return {
      notes: [],
      folders: [],
      selectedFile: { title: '' },
      clickPosition: { x: 0, y: 0 },
      renaming: false,
      currentDirectory: [],
      newFileType: null,
      newFileTitle: '',
      newFileExternalLink: '',
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
    renameNote(oldTitle, newTitle) {
      this.renaming = false;
      const renamedNote = this.notes.find(note => note.title === oldTitle);
      renamedNote.title = newTitle;
      this.selectedFile.title = '';
    },
    changeLocation(newLocation) {
      const indexOfNewLocation = this.currentDirectory.indexOf(newLocation);
      this.currentDirectory = this.currentDirectory.slice(0, indexOfNewLocation + 1);
    },
    createNewFile() {
      if (this.newFileType === 'FOLDER') {
        this.gql(
          `mutation{
              createFolder(title:"${this.newFileTitle}",
                            groupId:"${this.$route.params.id}"
                            ${
                              this.parentFolderId !== undefined
                                ? `, parentFolderId:"${this.parentFolderId}"`
                                : ''
                            })
                    {
                      id,
                    }
              }`,
        ).then(res => {
          try {
            this.folders = [
              ...this.folders,
              {
                title: this.newFileTitle,
                id: res.data.createFolder.id,
              },
            ];
          } catch (error) {
            console.error(error)
          }
        });
      } else if (this.newFileType === 'EXTERNAL') {
        this.gql(
          `mutation{
              createNote(title:"${this.newFileTitle}",
                          type:EXTERNAL,
                          link: "${this.newFileExternalLink}",
                          groupId:"${this.$route.params.id}"${
            this.parentFolderId !== undefined ? `, parentFolderId:"${this.parentFolderId}"` : ''
          })
                    {
                      id,
                      link
                    }
                  }`,
        ).then(res => {
          try {
            this.notes = [
              ...this.notes,
              {
                title: this.newFileTitle,
                type: this.newFileType,
                id: res.data.createNote.id,
                link: res.data.createNote.link,
              },
            ];
          } catch (error) {
            console.error(error);
          }
        });
      } else {
        this.gql(
          `mutation{
              createNote(title:"${this.newFileTitle}",
                          type:${this.newFileType},
                          groupId:"${this.$route.params.id}"${
            this.parentFolderId !== undefined ? `, parentFolderId:"${this.parentFolderId}"` : ''
          })
                    {
                      id,
                    }
                  }`,
        ).then(res => {
          try {
            this.notes = [
              ...this.notes,
              {
                title: this.newFileTitle,
                type: this.newFileType,
                id: res.data.createNote.id,
              },
            ];
          } catch (error) {
            console.error(error);
          }
        });
      }
    },
  },
  mounted() {
    this.gql(
      `{
            group(id: "${this.$route.params.id}"){
              name,
              notes{
                id,
                title,
                type,
                link,
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
    ).then(({ data }) => {
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
