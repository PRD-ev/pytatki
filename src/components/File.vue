<template>
  <div class="file">
    <div class="file__symbol">
      <img
        v-if="type==='external'"
        class="file-type"
        src="@/assets/icons/link.svg"
        alt="notatka zewnętrzna"
      >
      <img
        v-if="type==='download'"
        class="file-type"
        src="@/assets/icons/download-fill.svg"
        alt="pobierz"
      >
      <img
        v-if="type==='pytatki'"
        class="file-type"
        src="@/assets/icons/quill-pen-fill.svg"
        alt="notatka"
      >
    </div>
    {{name}}
  </div>
</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'File',
  props: {
    name: String,
    type: {
      type: String,
      required: true,
      // prettier-ignore
      validator: type => ['download', 'pytatki', 'external'].indexOf(type) !== -1,
    },
  },
});
</script>

<style scoped lang="scss">
.file {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  font-size: 14px;
  margin: 20px 20px 0;
  &__symbol {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    height: 95px;
    width: 75px;
    clip-path: polygon(0 0, 70% 0, 100% 23%, 100% 100%, 0 100%);
    background: linear-gradient(90deg, var(--orange) 0%, var(--light-orange) 100%);
  }
}
.file-type {
  height: 50px;
}
</style>
