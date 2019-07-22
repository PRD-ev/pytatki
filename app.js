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
        name: args.name,
      };
      return prisma.createGroup(group);
    },
    createNote: async (parent, args) => {
      const note = {
        title: args.title,
      };
      return prisma.createNote(note);
    },
    createFolder: async (parent, args) => {
      const folder = {
        title: args.title,
      };
      return prisma.createFolder(folder);
    },
  },
  User: {
    notes: (parent, args) => {
      return prisma.user({id: parent.id}).note();
    },
    groups: (parent, args) => {
      return prisma.user({id: parent.id}).group();
    },
  },
  Note: {
    author: (parent, args) => {
      return prisma.note({id: parent.id}).author();
    },
    parentFolder: (parent, args) => {
      return prisma.note({id: parent.id}).folder();
    },
  },
  Folder: {
    author: (parent, args) => {
      return prisma.folder({id: parent.id}).author();
    },
    parentFolder: (parent, args) => {
      return prisma.folder({id: parent.id}).folder();
    },
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
