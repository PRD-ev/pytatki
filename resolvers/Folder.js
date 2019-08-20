const { prisma } = require("../prisma-client");

const Folder = {
  author: (parent, args) => {
    return prisma.folder({ id: parent.id }).author();
  },
  parentFolder: (parent, args) => {
    return prisma.folder({ id: parent.id }).parentFolder();
  }
};

module.exports = {
  Folder
};
