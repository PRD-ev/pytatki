<template>
  <base-container>
    <div class="editor">
      <editor-menu-bubble
        :editor="editor"
        :keep-in-bounds="keepInBounds"
        v-slot="{ commands, isActive, menu }"
      >
        <div
          class="menububble"
          :class="{ 'is-active': menu.isActive }"
          :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
        >
          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <img src="@/assets/icons/bold.svg" alt="bold">
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <img src="@/assets/icons/italic.svg" alt="italic">
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <img src="@/assets/icons/strikethrough.svg" alt="strikethrough">
          </button>

          <button
            class="menububble__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <img src="@/assets/icons/underline.svg" alt="underline">
          </button>
        </div>
      </editor-menu-bubble>

      <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
          <base-input value="Roboto" size="half"/>
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >paragraph</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >H1</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >H2</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >H3</button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code() }"
            @click="commands.code"
          >
            <img src="@/assets/icons/code-view.svg" alt="code-view">
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <img src="@/assets/icons/list-unordered.svg" alt="list-unordered">
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <img src="@/assets/icons/list-ordered.svg" alt="list-ordered">
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <img src="@/assets/icons/double-quotes-r.svg" alt="quote">
          </button>

          <button class="menubar__button" @click="commands.horizontal_rule">hr</button>
          <button class="menubar__button" @click="commands.redo">
            <img src="@/assets/icons/align-left.svg" alt="redo">
          </button>
          <button class="menubar__button" @click="commands.redo">
            <img src="@/assets/icons/align-center.svg" alt="redo">
          </button>
          <button class="menubar__button" @click="commands.redo">
            <img src="@/assets/icons/align-right.svg" alt="redo">
          </button>

          <button class="menubar__button" @click="commands.undo">
            <img src="@/assets/icons/arrow-go-back-line.svg" alt="undo">
          </button>

          <button class="menubar__button" @click="commands.redo">
            <img src="@/assets/icons/arrow-go-forward-line.svg" alt="redo">
          </button>
        </div>
      </editor-menu-bar>

      <editor-content class="editor__content" :editor="editor"/>
    </div>
  </base-container>
</template>


<script>
import Vue from 'vue';
import BaseContainer from '@/components/BaseContainer.vue';
import BaseInput from '@/components/BaseInput.vue';
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap';
import {
  Blockquote,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
} from 'tiptap-extensions';

export default Vue.extend({
  name: 'note',
  components: {
    BaseContainer,
    BaseInput,
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  data() {
    return {
      keepInBounds: true,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
        ],
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <code>body { display: none; }</code>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
      }),
    };
  },
  beforeDestroy() {
    this.editor.destroy();
  },
});
</script>


<style lang="scss" scoped>
.editor {
  margin-top: 130px;
}
.menubar__button,
.menububble__button {
  padding: 10px;
  height: 39px;
    border-radius: 10px;
    border: none;
  cursor: pointer;
    background-color: var(--white);
  img {
    height: 20px;
  }
   &:hover {
      background-color: var(--gray);
    }
  &.is-active {
    background-color: var(--orange);
  }
}
.menubar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 2;
  background-color: var(--white);
  display: flex;
  flex-wrap: wrap;
}

.menububble {
  position: absolute;
  visibility: hidden;
  border: 1px solid var(--orange);
  border-radius: 10px;
  z-index: 3;
  &.is-active {
    visibility: visible;
  }
}
</style>
