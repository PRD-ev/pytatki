const { prisma } = require("../prisma-client");

const Note = {
  content:  async (parent, args, context) => {
    const noteGroup = await prisma.note({ id: parent.id }).group().id();
    const userGroups = await prisma.user({ id: context.id }).groups().id();
    const userGroupsFormatted = userGroups.map((el)=>el.id)
    if (userGroupsFormatted.includes(noteGroup) || context.role === "ADMIN") {
      return prisma.note({ id: parent.id }).content();
    }
    throw new Error("You don't have permission for that action");
  },
  author: (parent, args) => {
    return prisma.note({ id: parent.id }).author();
  },
  parentFolder: (parent, args) => {
    return prisma.note({ id: parent.id }).parentFolder();
  }
};

module.exports = {
  Note
};
