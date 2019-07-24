const { prisma } = require("../prisma-client");

const User = {
  email:  async (parent, args, context) => {
    const user = await prisma.user({ id: parent.id });
    if (user.id === context.id || context.role === "ADMIN") {
      return user.email;
    }
    throw new Error("You don't have permission for that action");
  },
  password: async (parent, args, context) => {
    const user = await prisma.user({ id: parent.id });
    if (user.id === context.id || context.role === "ADMIN") {
      return user.password;
    }
    throw new Error("You don't have permission for that action");
  },
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
