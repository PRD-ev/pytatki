const { prisma } = require("../prisma-client");

const Query = {
  users: (parent, args, context, info) => {
    if (context.role === "ADMIN") {
      return prisma.users();
    }
    throw new Error("You don't have permission for that action");
  },
  user: (parent, args, context, info) => {
    return prisma.user({ id: args.id });
  },
  group: (parent, args, context, info) => {
    return prisma.group({ id: args.id });
  },
  folder: (paren, args, context, info) => {
    return prisma.folder({ id: args.id });
  },
  note: (paren, args, context, info) => {
    return prisma.note({ id: args.id });
  }
};

module.exports = {
  Query
};
