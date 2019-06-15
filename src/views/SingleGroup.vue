<template>
  <base-container>
    <current-location/>
    <div class="pliki">
      <base-modal :key="note.name" v-for="note in notes">
        <template v-slot:modal-content>
          <div class="modal-content">
            <folder/>
            <div>
              <p>{{note.name}}</p>Autor:
              <p>
                <b>Filip Wachowiak</b>
                <base-user size="small"/>
              </p>
              <p>Data utworzenia: 13 mar 2019</p>
            </div>
            <base-button>Otwórz</base-button>
          </div>
        </template>
        <template v-slot:triggerer>
          <folder :name="note.name"/>
        </template>
      </base-modal>
      <base-modal :key="note.name+'1'" v-for="note in notes">
        <template v-slot:modal-content>
          <div class="modal-content">
            <file :type="note.type"/>
            <div>
              <p>{{note.name}}</p>Autor:
              <p>
                <b>Filip Wachowiak</b>
                <base-user size="small"/>
              </p>
              <p>Data utworzenia: 13 mar 2019</p>
            </div>
            <base-button>Otwórz</base-button>
          </div>
        </template>
        <template v-slot:triggerer>
          <file :name="note.name" :type="note.type"/>
        </template>
      </base-modal>
    </div>
    <base-modal>
      <template v-slot:modal-content>
        <p>zwykła notatka</p>
        <p>notatka zewnętrzna</p>
        <p>plik</p>
      </template>
      <template v-slot:triggerer>
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
import Folder from '@/components/Folder.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseUser from '@/components/BaseUser.vue';
import BaseButton from '@/components/BaseButton.vue';

export default Vue.extend({
  name: 'singleGroup',
  components: {
    File,
    Folder,
    BaseContainer,
    CurrentLocation,
    FloatingButton,
    BaseModal,
    BaseUser,
    BaseButton,
  },
  data() {
    return {
      notes: [
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
        {
          name: 'Johny Krzaczek3',
          image:
            'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300',
          type: 'external',
        },
        {
          name: 'Elita Przybylskiego3',
          image:
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300',
          type: 'external',
        },
      ],
    };
  },
});
</script>

<style lang="scss" scoped>
.pliki {
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}
.modal-content {
  display: flex;
  cursor: default;
}
</style>
