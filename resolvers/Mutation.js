const { prisma } = require("../prisma-client");

const Mutation = {
  createGroup: async (parent, args) => {
    const group = {
      name: args.name
    };
    return prisma.createGroup(group);
  },

  updateGroup: async (parent, { id, name, image }) => {
    const group = await prisma.group({ id: id });
    const newGroup = {
      name: name ? name : group.name,
      image: image ? image : group.image
    };
    return prisma.updateGroup({ data: newGroup, where: { id: id } });
  },

  deleteGroup: async (parent, args) => {
    return prisma.deleteGroup({ id: args.id });
  },

  createNote: async (
    parent,
    { title, type, groupId, authorId, parentFolderId }
  ) => {
    const note = {
      title,
      author: { connect: { id: authorId } },
      type,
      group: { connect: { id: groupId } }
    };
    if (parentFolderId) {
      note.parentFolder = { connect: { id: parentFolderId } };
    }
    return prisma.createNote(note);
  },

  updateNote: async (parent, { id, title, parentFolder }) => {
    const note = await prisma.note({ id: id });
    const newNote = {
      title: title ? title : note.title,
      parentFolder: parentFolder ? parentFolder : note.parentFolder
    };
    return prisma.updateNote({ data: newNote, where: { id: id } });
  },

  deleteNote: async (parent, args) => {
    return prisma.deleteNote({ id: args.id });
  },

  createFolder: async (parent, { title, type, groupId, authorId }) => {
    const folder = {
      title,
      author: { connect: { id: authorId } },
      type,
      group: { connect: { id: groupId } }
    };
    return prisma.createFolder(folder);
  },

  updateFolder: async (parent, { id, name, parentFolder }) => {
    const folder = await prisma.folder({ id: id });
    const newFolder = {
      name: name ? name : folder.name,
      parentFolder: parentFolder ? parentFolder : folder.parentFolder
    };
    return prisma.updateFolder({ data: newFolder, where: { id: id } });
  },

  deleteFolder: async (parent, args) => {
    return prisma.deleteFolder({ id: args.id });
  },

  removeUserFromGroup: async (parent, { groupId, userId }) => {
    return prisma.updateGroup({
      data: { members: { disconnect: { id: userId } } },
      where: { id: groupId }
    });
  },
  addUserToGroup: async (parent, { groupId, userId }) => {
    return prisma.updateGroup({
      data: { members: { connect: { id: userId } } },
      where: { id: groupId }
    });
  }
};

module.exports = {
  Mutation
};
