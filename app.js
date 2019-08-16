require("babel-register")({
  presets: ["es2015"]
});

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const compression = require("compression");
const jsonWebToken = require("jsonwebtoken");
const { prisma } = require("./prisma-client");
const history = require("connect-history-api-fallback");

const { ApolloServer, gql } = require("apollo-server-express");
const { readFileSync } = require("fs");
const { resolvers } = require("./resolvers");

const JWTSecretKey = "super-secret-key";
const bcrypt = require("bcrypt");
const http = require("http");

const app = express();
const httpServer = http.createServer(app);

const io = require("socket.io").listen(httpServer, {
  serveClient: false
});
function getDoc() {
  return "test";
}
io.on("connection", function(socket) {
  io.emit("init", getDoc());

  socket.on("disconnect", function() {
    io.emit("user disconnected");
  });
});

app.use(compression());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  // res.sendFile(path.join(__dirname, "front", "dist", "index.html"));
  res.render("index", { title: "Hey", message: "Hello from router!" });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "public", "about.html"));
});

app.post("/register", (req, res) => {
  const MILLISECONDS_IN_HOUR = 3600000;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, async function(err, hash) {
      try {
        const user = await prisma.createUser({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          role: "USER"
        });
        const token = jsonWebToken.sign(user, JWTSecretKey);
        res.cookie("jwt", token, {
          maxAge: MILLISECONDS_IN_HOUR,
          httpOnly: true
        });
        res.redirect("/");
      } catch (error) {
        res.send({ error: true, data: error });
      }
    });
  });
});

app.post("/login", async (req, res) => {
  const MILLISECONDS_IN_HOUR = 3600000;
  try {
    const user = await prisma.user({
      email: req.body.email
    });
    bcrypt.compare(req.body.password, user.password, function(err, result) {
      if (result) {
        const tokenData = {
          email: user.email,
          name: user.name,
          role: user.role,
          id: user.id
        };
        const token = jsonWebToken.sign(tokenData, JWTSecretKey);
        res.cookie("jwt", token, {
          maxAge: MILLISECONDS_IN_HOUR,
          httpOnly: true
        });
        res.redirect("/");
      } else {
        res.send({ error: true, data: "Invalid email or password" });
      }
    });
  } catch (error) {
    res.send({ error: true, data: error });
  }
});

const apolloServer = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat("/schema/schema.graphql"), "utf8")}
  `,
  resolvers,
  context: ({ req, res }) => {
    const MILLISECONDS_IN_HOUR = 3600000;
    const cookie = req.cookies.jwt;
    if (cookie === undefined) {
      res.send({ error: true, data: "You must be logged in" }, 403);
    } else {
      res.cookie("jwt", cookie, {
        maxAge: MILLISECONDS_IN_HOUR,
        httpOnly: true
      });
    }
    try {
      return jsonWebToken.verify(cookie, JWTSecretKey);
    } catch (error) {
      res.send({ error: true, data: error }, 403);
      return {};
    }
  }
});
apolloServer.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, "front", "dist")));
app.use(
  history({
    disableDotRule: true,
    verbose: true
  })
);
app.use(express.static(path.join(__dirname, "front", "dist")));

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
httpServer.listen({ port: 4000 }, () =>
  console.log(
    `🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`
  )
);
