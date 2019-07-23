const { prisma } = require("../prisma-client");

const Note = {
  author: (parent, args) => {
    return prisma.note({ id: parent.id }).author();
  },
  parentFolder: (parent, args) => {
    return prisma.note({ id: parent.id }).folder();
  }
};

module.exports = {
  Note
};
