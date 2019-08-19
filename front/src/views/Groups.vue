<template>
  <base-container>
    <current-location />
    <div class="grupy">
      <group :key="group.name" v-for="group in groups" :name="group.name" :image="group.image" />
    </div>
    <base-modal>
      <template v-slot:modal-content>
        <input-with-label>Nazwa grupy</input-with-label>
        <label for="group-thumbnail">Zdjęcie grupy</label>
        <input type="file" name id="group-thumbnail" />
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
import Group from '@/components/Group.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import BaseModal from '@/components/BaseModal.vue';
import InputWithLabel from '@/components/InputWithLabel.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import FloatingButton from '@/components/FloatingButton.vue';

export default Vue.extend({
  name: 'groups',
  components: {
    Group,
    BaseContainer,
    BaseModal,
    InputWithLabel,
    CurrentLocation,
    FloatingButton,
  },
  data() {
    return {
      groups: [
        {
          name: 'Elita Przybylskiego3',
          image:
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=1',
        },
      ],
    };
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
        query:
          '{\n  user(id: "5d570de3fca1360007497cbe") {\n    groups {\n      name\n    }\n  }\n}\n',
      }),
    }).then((res) => console.log(res));
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
