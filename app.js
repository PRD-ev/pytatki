require("babel-register")({
  presets: ["es2015"]
});

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");

const indexRouter = require("./routes/index");

const { ApolloServer, gql } = require("apollo-server-express");
const { readFileSync } = require("fs");
const { resolvers } = require("./resolvers");

const server = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat("/schema/schema.graphql"), "utf8")}
  `,
  resolvers,
});


const app = express();

server.applyMiddleware({ app });

app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'pug')

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

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

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)

module.exports = app;
