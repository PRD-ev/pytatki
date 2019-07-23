const { prisma } = require("../prisma-client");

const Query = {
  users: async (parent, args, context, info) => {
    return prisma.users();
  },
  user: async (parent, args, context, info) => {
    return prisma.user({ id: args.id });
  },
  group: async (parent, args, context, info) => {
    return prisma.group({ id: args.id });
  },
  folder: async (paren, args, context, info) => {
    return prisma.folder({ id: args.id });
  }
};

module.exports = {
  Query
};
