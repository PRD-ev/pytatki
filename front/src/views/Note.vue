<template>
  <div style="display:contents;">
    <base-container>
      <floating-button
        :right="sidebarAlwaysOn?'335px':''"
        :class="readOnly?'':'v-hidden'"
        @click.native="edit"
      >
        <img class="pen" src="@/assets/icons/pen.svg" alt="edit" />
      </floating-button>
      <div class="editor" v-if="editor && !loading">
        <editor-menu-bubble
          v-if="!readOnly"
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
              <img src="@/assets/icons/bold.svg" alt="bold" />
            </button>

            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic"
            >
              <img src="@/assets/icons/italic.svg" alt="italic" />
            </button>

            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike"
            >
              <img src="@/assets/icons/strikethrough.svg" alt="strikethrough" />
            </button>

            <button
              class="menububble__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline"
            >
              <img src="@/assets/icons/underline.svg" alt="underline" />
            </button>
          </div>
        </editor-menu-bubble>

        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="menubar" :class="readOnly?'v-hidden':''">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph"
            >P</button>

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
              <img src="@/assets/icons/code-view.svg" alt="code-view" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list"
            >
              <img src="@/assets/icons/list-unordered.svg" alt="list-unordered" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list"
            >
              <img src="@/assets/icons/list-ordered.svg" alt="list-ordered" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote"
            >
              <img src="@/assets/icons/double-quotes-r.svg" alt="quote" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph({ textAlign: 'left' }) }"
              @click="commands.paragraph({ textAlign: 'left' })"
            >
              <img src="@/assets/icons/align-left.svg" alt="align left" />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph({ textAlign: 'center' }) }"
              @click="commands.paragraph({ textAlign: 'center' })"
            >
              <img src="@/assets/icons/align-center.svg" alt="align center" />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph({ textAlign: 'right' }) }"
              @click="commands.paragraph({ textAlign: 'right' })"
            >
              <img src="@/assets/icons/align-right.svg" alt="align right" />
            </button>

            <button class="menubar__button" @click="commands.undo">
              <img src="@/assets/icons/arrow-go-back-line.svg" alt="undo" />
            </button>

            <button class="menubar__button" @click="commands.redo">
              <img src="@/assets/icons/arrow-go-forward-line.svg" alt="redo" />
            </button>

            <button class="menubar__button save-button" @click="save">
              <img src="@/assets/icons/check-fill.svg" alt="save" />
            </button>
          </div>
        </editor-menu-bar>

        <editor-content class="editor__content" :editor="editor" />
      </div>
      <div v-else>Ładowanie dokumentu</div>
    </base-container>
    <note-sidebar :sidebarAlwaysOn="sidebarAlwaysOn" />
  </div>
</template>


<script>
import Vue from 'vue';
import {
  Editor, EditorContent, EditorMenuBar, EditorMenuBubble,
} from 'tiptap';
import {
  Blockquote,
  HardBreak,
  Heading,
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
  Collaboration,
} from 'tiptap-extensions';
import io from 'socket.io-client';
import BaseContainer from '@/components/BaseContainer.vue';
import FloatingButton from '@/components/FloatingButton.vue';
import NoteSidebar from '@/components/NoteSidebar.vue';
// eslint-disable-next-line object-curly-newline
import Paragraph from '@/tiptap-extensions/paragraph';

export default Vue.extend({
  name: 'note',
  components: {
    BaseContainer,
    FloatingButton,
    NoteSidebar,
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble,
  },
  data() {
    return {
      readOnly: true,
      sidebarAlwaysOn: window.innerWidth > 1193,
      keepInBounds: true,
      editor: null,
      socket: null,
      loading: true,
    };
  },
  watch: {
    readOnly() {
      this.editor.setOptions({
        editable: !this.readOnly,
      });
    },
  },
  methods: {
    onInit({ doc, version }) {
      this.loading = false;
      if (this.editor) {
        this.editor.destroy();
      }

      this.editor = new Editor({
        editable: false,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Paragraph(),
          new Collaboration({
            // the initial version we start with
            // version is an integer which is incremented with every change
            version,
            // debounce changes so we can save some requests
            debounce: 250,
            // onSendable is called whenever there are changed we have to send to our server
            onSendable: ({ sendable }) => {
              this.socket.emit('update', sendable);
            },
          }),
        ],
        content: doc,
      });
    },
    save() {
      this.readOnly = true;
    },
    edit() {
      this.readOnly = false;
    },
  },
  mounted() {
    this.socket = io('ws://localhost:4000')
      // get the current document and its version
      .on('init', data => this.onInit(data))
      // send all updates to the collaboration extension
      .on('update', data => this.editor.extensions.options.collaboration.update(data));
    this.socket.emit('getDoc', this.$route.params.id);
  },
  beforeDestroy() {
    this.editor.destroy();
    // this.socket.destroy();
  },
});
</script>


<style lang="scss" scoped>
.editor {
  margin-top: 100px;
  @media screen and (min-width: 769px) {
    padding: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  }
}
.menubar__button,
.menububble__button {
  padding: 8px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background-color: var(--white);
  cursor: pointer;
  img {
    height: 100%;
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
  align-items: center;
  flex-wrap: wrap;
  box-shadow: var(--box-shadow);
  display: flex;
  align-items: center;
  padding: 3px 20px;
  @media screen and (min-width: 769px) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50px;
    border-radius: 10px;
    width: 600px;
  }
  &__button {
    font-size: 14px;
    margin: 3px 2px;
    display: flex;
    align-items: center;
  }
}

.menububble {
  background-color: var(--white);
  position: absolute;
  visibility: hidden;
  border: 1px solid var(--orange);
  border-radius: 10px;
  z-index: 3;
  &.is-active {
    visibility: visible;
  }
}
.save-button {
  border-radius: 50%;
  margin: 0 0 0 auto;
  width: 30px;
  height: 30px;
  padding: 5px;
  background-color: var(--orange);
  &:hover {
    background-color: var(--orange);
  }
}
.pen {
  height: 27px;
}
.basic-input {
  margin: 5px;
}
</style>
