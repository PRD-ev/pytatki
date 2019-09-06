<template>
  <base-container @click.native.capture="hideContextMenu" @contextmenu.native="hideContextMenu">
    <current-location @change-location="changeLocation" :location="currentDirectory" />
    <context-menu
      class="pliki"
      @rename-init="renaming=true"
      @delete="deleteNote"
      :element="selectedFile"
      :clickPosition="clickPosition"
      elementType="file"
    >
      <file
        @open-folder="openFolder"
        @rename-note="renameNote"
        @open-context-menu="showContextMenu"
        :key="folder.id"
        v-for="folder in displayedFolders"
        type="FOLDER"
        :title="folder.title"
        :author="folder.author.name"
        :renaming="folder.id === selectedFile.id && renaming"
        :id="folder.id"
      />
      <file
        @rename-note="renameNote"
        @open-context-menu="showContextMenu"
        :key="note.id"
        v-for="note in displayedNotes"
        :type="note.type"
        :title="note.title"
        :renaming="note.id === selectedFile.id && renaming"
        :id="note.id"
        :author="note.author.name"
        :link="note.link"
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
      selectedFile: {},
      clickPosition: { x: 0, y: 0 },
      renaming: false,
      currentDirectory: [],
      newFileType: null,
      newFileTitle: '',
      newFileExternalLink: '',
    };
  },
  computed: {
    displayedFolders() {
      return this.folders.filter((folder) => {
        if (folder.parentFolder === null) {
          if (this.currentDirectory.length === 1) {
            return true;
          }
          return false;
        }
        if (folder.parentFolder.id === this.currentDirectory[this.currentDirectory.length - 1].id) return true;
        return false;
      });
    },
    displayedNotes() {
      return this.notes.filter((note) => {
        if (note.parentFolder === null) {
          if (this.currentDirectory.length === 1) {
            return true;
          }
          return false;
        }
        if (note.parentFolder.id === this.currentDirectory[this.currentDirectory.length - 1].id) return true;
        return false;
      });
    },
  },
  methods: {
    showContextMenu(file, event) {
      this.renaming = false;
      this.selectedFile = file;
      this.clickPosition.x = event.clientX;
      this.clickPosition.y = event.clientY;
    },
    hideContextMenu() {
      this.clickPosition.x = 0;
      this.clickPosition.y = 0;
    },
    openFolder(folderId) {
      const openedFolder = [...this.folders].find(folder => folder.id === folderId);
      this.currentDirectory = [
        ...this.currentDirectory,
        { name: openedFolder.title, id: openedFolder.id },
      ];
    },
    async renameNote(renamedNoteId, newTitle) {
      this.renaming = false;
      const renamedNote = [...this.notes].find(note => note.id === renamedNoteId);
      const renamedFolder = [...this.folders].find(folder => folder.id === renamedNoteId);
      let result;
      if (renamedNote !== undefined) {
        result = await this.gql(`
        mutation{
          updateNote(id:"${renamedNoteId}",title:"${newTitle}"){
            title
          }
        }
      `);
        renamedNote.title = result.data.updateNote.title;
      } else {
        result = await this.gql(`
        mutation{
          updateFolder(id:"${renamedNoteId}",title:"${newTitle}"){
            title
          }
        }
      `);
        renamedFolder.title = result.data.updateFolder.title;
      }
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
  this.currentDirectory.length !== 1
    ? `, parentFolderId:"${this.currentDirectory[this.currentDirectory.length - 1].id}"`
    : ''
})
                    {
                      id,
                      author{
                        name
                      },
                      parentFolder{
                        id
                      }
                    }
              }`,
        ).then((res) => {
          try {
            this.folders = [
              ...this.folders,
              {
                title: this.newFileTitle,
                id: res.data.createFolder.id,
                author: res.data.createFolder.author.name,
                parentFolder: res.data.createFolder.parentFolder,
              },
            ];
          } catch (error) {
            console.error(error);
          }
        });
      } else if (this.newFileType === 'EXTERNAL') {
        this.gql(
          `mutation{
              createNote(title:"${this.newFileTitle}",
                          type:EXTERNAL,
                          link: "${this.newFileExternalLink}",
                          groupId:"${this.$route.params.id}"${
  this.currentDirectory.length !== 1
    ? `, parentFolderId:"${this.currentDirectory[this.currentDirectory.length - 1].id}"`
    : ''
})
                    {
                      id,
                      link,
                      author{
                        name
                      },
                      parentFolder{
                        id
                      }
                    }
                  }`,
        ).then((res) => {
          console.log(res);
          try {
            this.notes = [
              ...this.notes,
              {
                title: this.newFileTitle,
                type: this.newFileType,
                id: res.data.createNote.id,
                link: res.data.createNote.link,
                author: {
                  name: res.data.createNote.author.name,
                },
                parentFolder: res.data.createNote.parentFolder,
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
  this.currentDirectory.length !== 1
    ? `, parentFolderId:"${this.currentDirectory[this.currentDirectory.length - 1].id}"`
    : ''
})
                    {
                      id,
                      author{
                        name
                      },
                      parentFolder{
                        id
                      }
                    }
                  }`,
        ).then((res) => {
          try {
            this.notes = [
              ...this.notes,
              {
                title: this.newFileTitle,
                type: this.newFileType,
                id: res.data.createNote.id,
                author: {
                  name: res.data.createNote.author.name,
                },
                parentFolder: res.data.createNote.parentFolder,
              },
            ];
          } catch (error) {
            console.error(error);
          }
        });
      }
      // TODO: move add file modal to separate component in the future, and close it after adding
      setTimeout(() => {
        this.newFileTitle = '';
        this.newFileExternalLink = '';
      }, 300);
    },
    deleteNote(fileId, fileType) {
      if (fileType === 'FOLDER') {
        this.gql(
          `
      mutation{
        deleteFolder(id:"${fileId}"){
          id
        }
      }
      `,
        ).then((res) => {
          try {
            this.folders = this.folders.filter(folder => folder.id !== res.data.deleteFolder.id);
          } catch (error) {
            console.error(error);
          }
        });
      } else {
        this.gql(
          `
      mutation{
        deleteNote(id:"${fileId}"){
          id
        }
      }
      `,
        ).then((res) => {
          try {
            this.notes = this.notes.filter(note => note.id !== res.data.deleteNote.id);
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
                author{
                  name
                }
                parentFolder{
                  title,
                  id
                }
              },
              folders{
                id,
                title,
                author{
                  name
                }
                parentFolder{
                  title,
                  id
                }
              }
            }
          }`,
    ).then(({ data }) => {
      this.folders = data.group.folders;
      this.notes = data.group.notes;
      this.currentDirectory = [{ name: data.group.name }];
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
