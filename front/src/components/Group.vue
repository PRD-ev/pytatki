<template>
  <div class="group" @contextmenu.prevent="openContextMenu">
    <router-link :to="`/group/${id}`" v-if="!renaming">
      <div :style="`background-image: url('${image}');`" class="group__circle"></div>
      {{name}}
    </router-link>
    <div v-else>
      <div :style="`background-image: url('${image}');`" class="group__circle"></div>
      <base-input v-model="newName" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import BaseInput from '@/components/BaseInput.vue';

export default Vue.extend({
  name: 'Group',
  components: {
    BaseInput,
  },
  props: {
    name: String,
    image: String,
    id: String,
    renaming: Boolean,
  },
  data() {
    return {
      newName: this.name,
    };
  },
  updated() {
    if (this.renaming === true) {
      window.addEventListener('click', this.renameGroup, { capture: true });
      window.addEventListener('keypress', this.renameGroup);
    }
  },
  methods: {
    openContextMenu(event) {
      event.stopPropagation();
      this.$emit(
        'open-context-menu',
        {
          id: this.id,
          name: this.name,
          author: this.author,
        },
        event,
      );
    },
    renameGroup(event) {
      const key = event.which || event.keyCode;
      if (event.target.nodeName !== 'INPUT' || key === 13) {
        this.$emit('rename-group', this.id, this.newName);
        window.removeEventListener('click', this.renameGroup, { capture: true });
        window.removeEventListener('keypress', this.renameGroup);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.group {
  text-align: center;
  font-size: 22px;
  margin: 20px;
  @media screen and (max-width: 768px) {
    font-size: 20px;
    margin: 15px;
  }
}
.group__circle {
  width: 140px;
  height: 140px;
  background-size: cover;
  border-radius: 50%;
  margin: 20px auto;
  box-shadow: var(--box-shadow);
  @media screen and (max-width: 768px) {
    width: 130px;
    height: 130px;
    margin: 10px auto;
  }
}
</style>
