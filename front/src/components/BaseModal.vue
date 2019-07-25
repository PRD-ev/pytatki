<template>
  <div>
    <div @click="openModal">
      <slot name="trigger"></slot>
    </div>
    <div v-if="modalOn">
      <div @click="closeModal" class="dark-background"></div>
      <div class="modal">
        <div @click="closeModal" class="close-modal">
          <img src="@/assets/icons/close.svg" alt="close modal">
        </div>
        <slot name="modal-content"></slot>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'BaseModal',
  data() {
    return {
      modalOn: false,
    };
  },
  methods: {
    openModal() {
      this.modalOn = true;
    },
    closeModal() {
      this.modalOn = false;
    },
  },
});
</script>


<style lang="scss" scoped>
.close-modal {
  filter: invert(1);
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
}
.dark-background {
  background-color: #000000be;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 5;
  cursor: pointer;
}
.modal {
  z-index: 6;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white);
  padding: 40px 50px;
  border-radius: 10px;
  max-height: 90vh;
  max-width: 90vw;
  overflow: auto;
}
</style>
