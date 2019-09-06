<template>
  <base-container @click.native.capture="hideContextMenu" @contextmenu.native="hideContextMenu">
    <current-location />
    <context-menu
      @rename-init="renaming=true"
      @delete="deleteGroup"
      :clickPosition="clickPosition"
      :element="selectedGroup"
      elementType="group"
      class="grupy"
    >
      <group
        :key="group.id"
        v-for="group in groups"
        @open-context-menu="showContextMenu"
        @rename-group="renameGroup"
        :name="group.name"
        :image="group.image"
        :id="group.id"
        :renaming="group.id === selectedGroup.id && renaming"
      />
    </context-menu>
    <base-modal>
      <template v-slot:modal-content>
        <input-with-label
          :value="newGroupName"
          @input.native="newGroupName = $event.target.value"
        >Nazwa grupy</input-with-label>
        <label for="group-thumbnail">Zdjęcie grupy</label>
        <input type="file" id="group-thumbnail" ref="groupImage" />
        <input type="submit" value="Utwórz grupę" @click="createNewGroup" />
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
import gql from 'graphql-tag';
import Group from '@/components/Group.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import BaseModal from '@/components/BaseModal.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import ContextMenu from '@/components/ContextMenu.vue';

export default Vue.extend({
  name: 'groups',
  components: {
    Group,
    BaseContainer,
    BaseModal,
    InputWithLabel,
    ContextMenu,
    CurrentLocation,
    FloatingButton,
  },
  data() {
    return {
      groups: [],
      newGroupName: '',
      renaming: false,
      selectedGroup: {},
      clickPosition: { x: 0, y: 0 },
    };
  },
  methods: {
    showContextMenu(group, event) {
      this.renaming = false;
      this.selectedGroup = group;
      this.clickPosition.x = event.clientX;
      this.clickPosition.y = event.clientY;
    },
    hideContextMenu() {
      this.clickPosition.x = 0;
      this.clickPosition.y = 0;
    },
    deleteGroup(groupId) {
      this.gql(
        `
      mutation{
        deleteGroup(id:"${groupId}"){
          id
        }
      }
      `,
      ).then((res) => {
        try {
          this.groups = this.groups.filter(group => group.id !== res.data.deleteGroup.id);
        } catch (error) {
          console.error(error);
        }
      });
    },
    async renameGroup(renamedGroupId, newName) {
      this.renaming = false;
      const renamedGroup = [...this.groups].find(group => group.id === renamedGroupId);
      let result;
      result = await this.gql(`
        mutation{
          updateGroup(id:"${renamedGroupId}",name:"${newName}"){
            name
          }
        }
      `);
      renamedGroup.name = result.data.updateGroup.name;
    },
    async createNewGroup() {
      const CREATE_GROUP = gql`
        mutation createGroup($image: Upload) {
          createGroup(name: "${this.newGroupName}",image: $image) {
            id,
            image
          }
        }
      `;

      this.$apollo
        .mutate({
          mutation: CREATE_GROUP,
          variables: {
            image: this.$refs.groupImage.files[0],
          },
        })
        .then((res) => {
          try {
            this.groups = [
              ...this.groups,
              {
                name: this.newGroupName,
                id: res.data.createGroup.id,
                image: res.data.createGroup.image,
              },
            ];
          } catch (error) {
            console.error(error);
          }
        });
    },
  },
  mounted() {
    if (this.$store.state.user.id !== undefined) {
      this.gql(
        `{
            user(id: "${this.$store.state.user.id}"){
              groups{
                name,
                id,
                image
              }
            }
          }`,
      ).then((res) => {
        try {
          if (res.error) {
            if (res.data === 'You must be logged in') {
              this.$store.dispatch('setUserAction', {});
            }
            console.error(error);
          }
          this.groups = res.data.user.groups;
        } catch (error) {
          console.error(error);
        } finally {
          this.newGroupName = '';
        }
      });
    }
  },
});
</script>

<style lang="scss" scoped>
.grupy {
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media screen and (max-width: 769px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
