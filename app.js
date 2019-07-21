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


const { ApolloServer, gql } = require('apollo-server');
const { readFileSync } = require('fs');
const { prisma } = require('./prisma-client');


const resolvers = {
  Query: {
    movies: async () => await prisma.movies(),
    directors: async () => await prisma.directors(),
    movie: async (parent, args, context, info) => {
      return prisma.movie({ id: args.id });
    },
    director: async (parent, args, context, info) => {
      return prisma.director({ id: args.id });
    }
  },
  Mutation: {
    createMovie: async(parent, args) => {
      const movie = { title: args.title, duration: args.duration, director: {
        connect: { id: args.director }
      } };
      return prisma.createMovie(movie);
    },
    createDirector: async(parent, args) => {
      const director = { name: args.name };
      return prisma.createDirector(director);
    }
  },
  Movie: {
    duration: ({ duration }, args) => {
      if (args.unit == 'MINUTES') return Math.round(duration / 60);
      if (args.unit == 'HOURS') return Math.round(duration / 3600);

      return duration;
    },
    director: async (parent, args, context, info) => {
      return prisma.movie({ id: parent.id }).director()
    }
  },
  Director: {
    movies: (parent, args, context, info) => {
      return moviesList.filter(movie => movie.director_id == parent.id);
    }
  }
}



const server = new ApolloServer({
  typeDefs: gql`${readFileSync(__dirname.concat('/schema/schema.graphql'), 'utf8')}`,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});



var app = express();
app.use(compression());

if (process.env.ENVIRONMENT !== "dev") {
  FIREBASE_KEY = process.env.FIREBASE_KEY || `{"hello": "firebase"}`;

  let firebaseKey = JSON.parse(FIREBASE_KEY);

  admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
    databaseURL: "https://https://pytatki-1559814016089.firebaseio.com"
  });
}

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
