<template>
  <div class="modal-content">
    <folder v-if="type==='folder'" class="file-icon"/>
    <file v-else :type="note.type" class="file-icon"/>
    <div>
      <p class="modal-content__title">{{note.name}}</p>
      <p style="margin-bottom: 0; white-space: nowrap;">
        Autor:
        <b style="margin: 0 5px">Filip Wachowiak</b>
        <base-user style="transform: translateY(25%);" size="tiny"/>
      </p>
      <p style="margin: 10px 0 0 0; white-space: nowrap;">Data utworzenia: 13 mar 2019</p>
    </div>
    <base-button class="open-file-button">Otwórz</base-button>
  </div>
</template>


<script>
import Vue from 'vue';
import BaseUser from '@/components/BaseUser.vue';
import BaseButton from '@/components/BaseButton.vue';
import Folder from '@/components/Folder.vue';
import File from '@/components/File.vue';

export default Vue.extend({
  name: 'FileModal',
  components: {
    BaseUser,
    BaseButton,
    Folder,
    File,
  },
  props: {
    type: {
      type: String,
      required: true,
      // prettier-ignore
      validator: type => type === 'folder' || type === 'file',
    },
    note: Object,
  },
});
</script>


<style lang="scss" scoped>
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
