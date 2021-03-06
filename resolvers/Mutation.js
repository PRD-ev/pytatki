const { prisma } = require("../prisma-client");
const { writeFile, mkdir, createWriteStream } = require("fs");

const Mutation = {
  createGroup: async (parent, args, context) => {
    const group = {
      name: args.name,
      members: { connect: { id: context.id } },
      joinable: "0",
    };
    if (args.image) {
      const {
        filename,
        mimetype,
        encoding,
        createReadStream
      } = await args.image;
      try {
        mkdir(`./images/${context.id}`, { recursive: true }, async () => {
          createReadStream().pipe(
            createWriteStream(`./images/${context.id}/${filename}`)
          );
        });
        group.image = `/${context.id}/${filename}`;
      } catch (e) {
        console.log(e);
      }
    }
    return prisma.createGroup(group);
  },

  updateGroup: async (parent, { id, name, image, joinable }, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(id) || context.role === "ADMIN") {
      const group = await prisma.group({ id: id });
      const millisecondsIn15Minutes = 900000;
      const newGroup = {
        name: name ? name : group.name,
        image: image ? image : group.image,
        joinable: joinable
          ? String(Date.now() + millisecondsIn15Minutes)
          : group.joinable
      };
      return prisma.updateGroup({ data: newGroup, where: { id: id } });
    }
    throw new Error("You don't have permission for that action");
  },

  deleteGroup: async (parent, args, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(args.id) || context.role === "ADMIN") {
      return prisma.deleteGroup({ id: args.id });
    }
    throw new Error("You don't have permission for that action");
  },

  createNote: async (
    parent,
    { title, type, groupId, parentFolderId, link },
    context
  ) => {
    try {
      const userGroups = await prisma
        .user({ id: context.id })
        .groups()
        .id();
      const userGroupsFormatted = userGroups.map(el => el.id);
      if (userGroupsFormatted.includes(groupId) || context.role === "ADMIN") {
        const note = {
          title,
          author: { connect: { id: context.id } },
          type,
          group: { connect: { id: groupId } },
          link: link ? link : ""
        };
        if (parentFolderId) {
          note.parentFolder = { connect: { id: parentFolderId } };
        }
        const createdNote = prisma.createNote(note);
        const noteId = await createdNote.id();
        mkdir(`./notes/${noteId}`, { recursive: true }, async () => {
          writeFile(
            `./notes/${noteId}/db.json`,
            `{"version": 0,"doc":{ "type": "doc", "content": [{ "type": "paragraph", "content":[{ "type": "text", "text": "Czas zacząć tworzyć notatkę" }] }] }}`,
            err => {
              if (err) throw err;
            }
          );
          writeFile(`./notes/${noteId}/db_locked.json`, `false`, err => {
            if (err) throw err;
          });
          writeFile(`./notes/${noteId}/db_steps.json`, `[]`, err => {
            if (err) throw err;
          });
        });
        return prisma.updateNote({ data: note, where: { id: noteId } });
      }
    } catch (e) {
      console.error(e);
    }
    throw new Error("You don't have permission for that action");
  },

  updateNote: async (parent, { id, title, parentFolder }, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const noteGroup = await prisma
      .note({ id: id })
      .group()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(noteGroup) || context.role === "ADMIN") {
      const note = await prisma.note({ id: id });
      const newNote = {
        title: title ? title : note.title,
        parentFolder: parentFolder ? parentFolder : note.parentFolder
      };
      return prisma.updateNote({ data: newNote, where: { id: id } });
    }
    throw new Error("You don't have permission for that action");
  },

  deleteNote: async (parent, args, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const noteGroup = await prisma
      .note({ id: args.id })
      .group()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(noteGroup) || context.role === "ADMIN") {
      return prisma.deleteNote({ id: args.id });
    }
    throw new Error("You don't have permission for that action");
  },

  createFolder: async (
    parent,
    { title, type, groupId, parentFolderId },
    context
  ) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(groupId) || context.role === "ADMIN") {
      const folder = {
        title,
        author: { connect: { id: context.id } },
        type,
        group: { connect: { id: groupId } }
      };
      if (parentFolderId) {
        folder.parentFolder = { connect: { id: parentFolderId } };
      }
      return prisma.createFolder(folder);
    }
    throw new Error("You don't have permission for that action");
  },

  updateFolder: async (parent, { id, title, parentFolder }, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const folderGroup = await prisma
      .folder({ id: id })
      .group()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(folderGroup) || context.role === "ADMIN") {
      const folder = await prisma.folder({ id: id });
      const newFolder = {
        title: title ? title : folder.title,
        parentFolder: parentFolder ? parentFolder : folder.parentFolder
      };
      return prisma.updateFolder({ data: newFolder, where: { id: id } });
    }
    throw new Error("You don't have permission for that action");
  },

  deleteFolder: async (parent, args, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const folderGroup = await prisma
      .folder({ id: args.id })
      .group()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(folderGroup) || context.role === "ADMIN") {
      return prisma.deleteFolder({ id: args.id });
    }
    throw new Error("You don't have permission for that action");
  },

  removeUserFromGroup: async (parent, { groupId, userId }, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const folderGroup = await prisma
      .folder({ id: groupId })
      .group()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(folderGroup) || context.role === "ADMIN") {
      return prisma.updateGroup({
        data: { members: { disconnect: { id: userId } } },
        where: { id: groupId }
      });
    }
    throw new Error("You don't have permission for that action");
  },
  addUserToGroup: async (parent, { groupId, userId }, context) => {
    const userGroups = await prisma
      .user({ id: context.id })
      .groups()
      .id();
    const folderGroup = await prisma
      .folder({ id: groupId })
      .group()
      .id();
    const userGroupsFormatted = userGroups.map(el => el.id);
    if (userGroupsFormatted.includes(folderGroup) || context.role === "ADMIN") {
      return prisma.updateGroup({
        data: { members: { connect: { id: userId } } },
        where: { id: groupId }
      });
    }
    throw new Error("You don't have permission for that action");
  },
  updateUser: async (
    parent,
    { id, name, image, email, password, role },
    context
  ) => {
    if (context.id === id || context.role === "ADMIN") {
      const user = await prisma.user({ id: id || context.id });
      const newUser = {
        name: name ? name : user.name,
        password: password ? password : user.password,
        email: email ? email : user.email
      };
      if (image) {
        const { filename, mimetype, encoding, createReadStream } = await image;
        try {
          mkdir(`./images/${context.id}`, { recursive: true }, async () => {
            createReadStream().pipe(
              createWriteStream(`./images/${context.id}/${filename}`)
            );
          });
          newUser.image = `/${context.id}/${filename}`;
        } catch (e) {
          console.log(e);
        }
      }
      if (context.role === "ADMIN") {
        newUser.role = role ? role : user.role;
      }
      return prisma.updateUser({
        data: newUser,
        where: { id: id || context.id }
      });
    }
    throw new Error("You don't have permission for that action");
  },
  deleteUser: async (parent, { id }, context) => {
    if (context.id === id || context.role === "ADMIN") {
      return prisma.deleteUser({ id });
    }
    throw new Error("You don't have permission for that action");
  }
};

module.exports = {
  Mutation
};
