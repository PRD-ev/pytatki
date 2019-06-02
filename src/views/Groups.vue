<template>
  <base-container>
  <current-location/>
    <div class="grupy">
      <group :key="group.name" v-for="group in groups" :name="group.name" :image="group.image"/>
    </div>
    <floating-button><img src="@/assets/icons/plus.svg" alt="plus"></floating-button>
  </base-container>
</template>

<script>
import Vue from 'vue';
import Group from '@/components/Group.vue';
import BaseContainer from '@/components/BaseContainer.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import FloatingButton from '@/components/FloatingButton.vue';

export default Vue.extend({
  name: 'groups',
  components: {
    Group,
    BaseContainer,
    CurrentLocation,
    FloatingButton,
  },
  data() {
    return {
      groups: [
        {
          name: 'Grupa Krzysia',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
        },
        { name: 'Johny Krzaczek', image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300' },
        { name: 'Elita Przybylskiego', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300' },
        {
          name: 'Grupa Krzysia2',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
        },
        { name: 'Johny Krzaczek2', image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300' },
        { name: 'Elita Przybylskiego2', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300' },
        {
          name: 'Grupa Krzysia3',
          image:
            'https://images.unsplash.com/photo-1445620466293-d6316372ab59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&fit=crop&w=400&q=300',
        },
        { name: 'Johny Krzaczek3', image: 'https://images.unsplash.com/photo-1472555794301-77353b152fb7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=300' },
        { name: 'Elita Przybylskiego3', image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=300' },
      ],
    };
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
