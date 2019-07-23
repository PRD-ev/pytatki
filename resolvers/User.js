const { prisma } = require("../prisma-client");

const User = {
  notes: (parent, args) => {
    return prisma.user({ id: parent.id }).notes();
  },
  groups: (parent, args) => {
    return prisma.user({ id: parent.id }).groups();
  }
};

module.exports = {
  User
};
