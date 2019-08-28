const { Schema } = require("prosemirror-model");

const schema = {
  nodes: {
    doc: {
      content: "block+"
    },
    text: {
      group: "inline"
    },
    paragraph: {
      content: "inline*",
      group: "block",
      draggable: false,
      attrs: { textAlign: { default: "left", hasDefault: true } },
      parseDOM: [
        {
          tag: "p"
        }
      ]
    },
    list_item: {
      group: "block",
      content: "inline*",
      parseDOM: [{ tag: "li" }]
    },
    bullet_list: {
      group: "block",
      content: "block+",
      parseDOM: [{ tag: "ul" }]
    },
    ordered_list: {
      group: "block",
      content: "block+",
      parseDOM: [{ tag: "ol" }]
    },
    blockquote: {
      group: "block",
      content: "inline*",
      parseDOM: [
        {
          tag: "blockquote"
        }
      ]
    },
    hard_break: {
      inline: true,
      group: "inline",
      selectable: false,
      parseDOM: [
        {
          tag: "br"
        }
      ]
    },
    heading: {
      attrs: {
        level: {
          default: 1
        }
      },
      content: "inline*",
      group: "block",
      defining: true,
      draggable: false,
      parseDOM: [
        {
          tag: "h1",
          attrs: {
            level: 1
          }
        },
        {
          tag: "h2",
          attrs: {
            level: 2
          }
        },
        {
          tag: "h3",
          attrs: {
            level: 3
          }
        }
      ]
    }
  },
  marks: {
    bold: {
      parseDOM: [
        {
          tag: "strong"
        },
        {
          tag: "b"
        },
        {
          style: "font-weight"
        }
      ]
    },
    strike: {
      parseDOM: [
        {
          tag: "s"
        }
      ]
    },
    underline: {
      parseDOM: [
        {
          tag: "u"
        }
      ]
    },
    code: {
      parseDOM: [
        {
          tag: "code"
        }
      ]
    },
    italic: {
      parseDOM: [
        {
          tag: "i"
        },
        {
          tag: "em"
        },
        {
          style: "font-style=italic"
        }
      ]
    }
  }
};

module.exports = new Schema(schema);
