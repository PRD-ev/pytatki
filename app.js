require("babel-register")({
  presets: ["es2015"]
});

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var compression = require("compression");
var admin = require("firebase-admin");

var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");

const { ApolloServer, gql } = require("apollo-server");
const { readFileSync } = require("fs");
const { prisma } = require("./prisma-client");

const resolvers = {
  Query: {
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
  },
  Mutation: {
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
      // const members = await prisma.group({ id: groupId }).members();
      // const newMembers = {};
      // const updatedMembers = members.filter(member => member.id !== userId);
      // if (updatedMembers.length < members.length) {
      //   newMembers.members = {
      //     update: updatedMembers.map(member => {
      //       return { id: member.id };
      //     })
      //   };
        return prisma.updateGroup({
        data: { members: { disconnect: { id: userId } } },
          where: { id: groupId }
        });
      // }
    },
    addUserToGroup: async (parent, { groupId, userId }) => {
      return prisma.updateGroup({
        data: { members: { connect: { id: userId } } },
        where: { id: groupId }
      });
    }
  },
  User: {
    notes: (parent, args) => {
      return prisma.user({ id: parent.id }).notes();
    },
    groups: (parent, args) => {
      return prisma.user({ id: parent.id }).groups();
    }
  },
  Note: {
    author: (parent, args) => {
      return prisma.note({ id: parent.id }).author();
    },
    parentFolder: (parent, args) => {
      return prisma.note({ id: parent.id }).folder();
    }
  },
  Folder: {
    author: (parent, args) => {
      return prisma.folder({ id: parent.id }).author();
    },
    parentFolder: (parent, args) => {
      return prisma.folder({ id: parent.id }).folder();
    }
  },
  Group: {
    members: (parent, args) => {
      return prisma.group({ id: parent.id }).members();
    },
    folders: (parent, args) => {
      return prisma.group({ id: parent.id }).folders();
    },
    notes: (parent, args) => {
      return prisma.group({ id: parent.id }).notes();
    }
  }
};

const server = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat("/schema/schema.graphql"), "utf8")}
  `,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

var app = express();
app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
