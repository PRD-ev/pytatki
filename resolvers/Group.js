const { prisma } = require("../prisma-client");

const Group = {
  members: (parent, args) => {
    return prisma.group({ id: parent.id }).members();
  },
  folders: (parent, args) => {
    return prisma.group({ id: parent.id }).folders();
  },
  notes: (parent, args) => {
    return prisma.group({ id: parent.id }).notes();
  }
};

module.exports = {
  Group
};
