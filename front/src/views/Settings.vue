<template>
  <base-container>
    <current-location />
    <div class="settings-groups">
      <settings-group title="Użytkownik">
        <div class="user-with-buttons">
          <base-modal @close-modal="newFileType=null">
            <template v-slot:modal-content>
              <input type="file" @change="updateUserImage" />
            </template>
            <template v-slot:trigger>
              <div class="user-image-editable">
                <div class="darkener">
                  <base-user size="medium" :image="$store.state.user.image" />
                </div>
              </div>
            </template>
          </base-modal>
          <div>
            <base-button @click.native="deleteUser">Usuń konto</base-button>
          </div>
        </div>
        <div class="two-inputs">
          <input-with-label
            @input="(data)=>newEmail=data"
            :value="$store.state.user.email"
          >Adres e-mail</input-with-label>
          <div class="flex-divider"></div>
          <input-with-label
            @input="(data)=>newName=data"
            :value="$store.state.user.name"
          >Nazwa użytkownika</input-with-label>
        </div>
        <base-button @click.native="updateUser" v-if="savable">Zapisz zmiany</base-button>
      </settings-group>
    </div>
  </base-container>
</template>

<script>
import Vue from 'vue';
import gql from 'graphql-tag';
import BaseUser from '@/components/BaseUser.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import BaseButton from '@/components/BaseButton.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import SettingsGroup from '@/components/SettingsGroup.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';
import BaseModal from '@/components/BaseModal.vue';

export default Vue.extend({
  name: 'settings',
  components: {
    BaseUser,
    BaseContainer,
    BaseButton,
    CurrentLocation,
    SettingsGroup,
    InputWithLabel,
    BaseModal,
  },
  data() {
    return {
      newName: this.$store.state.user.name,
      newEmail: this.$store.state.user.email,
    };
  },
  computed: {
    savable() {
      return (
        this.$store.state.user.name !== this.newName
        || this.$store.state.user.email !== this.newEmail
      );
    },
  },
  methods: {
    async updateUserImage({ target }) {
      const UPDATE_USER = gql`
        mutation updateUser($image: Upload!) {
          updateUser(id: "${this.$store.state.user.id}", image: $image) {
            image
          }
        }
      `;
      this.$apollo
        .mutate({
          mutation: UPDATE_USER,
          variables: {
            image: target.files[0],
          },
        })
        .then((res) => {
          this.$store.dispatch('setUserImageAction', res.data.updateUser.image);
        });
    },
    updateUser() {
      this.gql(
        `mutation{
              updateUser(id:"${this.$store.state.user.id}", email:"${this.newEmail}", name: "${this.newName}")
                    {
                      id,
                    }
              }`,
      ).then((res) => {
        try {
          this.$store.dispatch('updateUserAction', {
            name: this.newName,
            email: this.newEmail,
          });
        } catch (error) {
          console.error(error);
        }
      });
    },
    deleteUser() {
      this.gql(
        `mutation{
              deleteUser(id:"${this.$store.state.user.id}")
                  {
                    id,
                  }
              }`,
      ).then((res) => {
        try {
          if (res.data.deleteUser !== null) this.$store.dispatch('setUserAction', {});
        } catch (error) {
          console.error(error);
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.user-with-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}
.two-inputs {
  display: flex;
}
.flex-divider {
  width: 50px;
}
.settings-groups {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.user-image-editable {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-image-editable:hover {
  cursor: pointer;
  .darkener {
    filter: brightness(0.7);
  }
  &::after {
    height: 30px;
    width: 30px;
    content: url('../assets/icons/pen.svg');
    z-index: 1;
    position: absolute;
  }
}
</style>
