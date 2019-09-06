<template>
  <div>
    <slot />
    <div class="context-menu" :style="`top: ${top}; left: ${left}; ${transformToFit}`">
      <div class="context-menu__entry" @click="$emit('rename-init')">Zmień nazwę</div>

      <base-modal v-if="elementType==='file'">
        <template v-slot:modal-content>
          <div class="modal-content">
            <file :type="element.type" class="file-icon" />
            <div>
              <p class="modal-content__title">{{element.title}}</p>
              <p style="margin-bottom: 0; white-space: nowrap;">
                Autor:
                <b style="margin: 0 5px">{{element.author}}</b>
                <base-user style="transform: translateY(25%);" size="tiny" />
              </p>
              <p style="margin: 10px 0 0 0; white-space: nowrap;">Data utworzenia:</p>
            </div>
            <base-button class="open-file-button">Otwórz</base-button>
          </div>
        </template>
        <template v-slot:trigger>
          <div class="context-menu__entry">Właściwości</div>
        </template>
      </base-modal>

      <base-modal v-else-if="elementType==='group'">
        <template v-slot:modal-content>
          <div class="modal-content">
            <img :src="element.image" alt="">
            <div>
              <p class="modal-content__title">{{element.name}}</p>
              <p style="margin-bottom: 0; white-space: nowrap;">
                Autor:
                <b style="margin: 0 5px"></b>
              </p>
              <p style="margin: 10px 0 0 0; white-space: nowrap;">Data utworzenia:</p>
            </div>
            <base-button class="open-file-button">Otwórz</base-button>
          </div>
        </template>
        <template v-slot:trigger>
          <div class="context-menu__entry">Właściwości</div>
        </template>
      </base-modal>

      <div class="context-menu__entry" @click="$emit('delete', element.id, element.type)">Usuń</div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import BaseModal from '@/components/BaseModal.vue';
import BaseUser from '@/components/BaseUser.vue';
import BaseButton from '@/components/BaseButton.vue';
import File from '@/components/File.vue';

export default Vue.extend({
  name: 'ContextMenu',
  components: {
    BaseModal,
    BaseUser,
    BaseButton,
    File,
  },
  props: {
    element: Object,
    clickPosition: Object,
    elementType: { required: true, type: String },
  },
  data() {
    return {
      type: 'folder',
    };
  },
  computed: {
    top() {
      return this.clickPosition.y === 0 ? '100%' : `${this.clickPosition.y}px`;
    },
    left() {
      return this.clickPosition.x === 0 ? '100%' : `${this.clickPosition.x}px`;
    },
    transformToFit() {
      let transform = 'transform: ';
      transform += this.clickPosition.x > window.innerWidth - 130 ? 'translateX(-100%) ' : '';
      transform += this.clickPosition.y > window.innerHeight - 110 ? 'translateY(-100%) ' : '';
      transform += ';';
      return transform;
    },
  },
});
</script>


<style lang="scss" scoped>
.context-menu {
  position: fixed;
  background-color: var(--white);
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  z-index: 1;
  &__entry {
    margin: 5px 0;
  }
}
.modal-content {
  display: flex;
  cursor: default;
  flex-direction: column;
  @media screen and (min-width: 769px) {
    flex-direction: row;
    align-items: center;
    margin-right: 230px;
  }

  &__title {
    font-size: 36px;
    font-weight: 400;
    margin: 0 0 20px 0;
  }
}
.open-file-button {
  margin: 20px 0 0;
  @media screen and (min-width: 769px) {
    margin: 5px;
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 200px;
  }
}
.file-icon {
  margin: 0;
  @media screen and (min-width: 769px) {
    margin-right: 30px;
  }
}
</style>
