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
const fs = require("fs");

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

//options
const { Step } = require("prosemirror-transform");
const schema = require("./prosemirror-schema.js");
const maxStoredSteps = 100;
const defaultData = {
  version: 0,
  doc: {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: "" }]
      }
    ]
  }
};

io.on("connection", function(socket) {
  let previousId;
  let docPath;
  let lockedPath;
  let stepsPath;
  const safeJoin = async currentId => {
    socket.leave(previousId);
    try {
      const jwtToken = socket.request.headers.cookie
        .match(/jwt=.*?; /m)[0]
        .slice(4, -2);
      const userId = jsonWebToken.verify(jwtToken, JWTSecretKey).id || false;
      const members = await prisma
        .note({ id: currentId })
        .group()
        .members();
      for (const member of members) {
        if (member.id === userId) {
          socket.join(currentId);
          previousId = currentId;
          docPath = `./notes/${currentId}/db.json`;
          lockedPath = `./notes/${currentId}/db_locked.json`;
          stepsPath = `./notes/${currentId}/db_steps.json`;
        }
      }
    } catch (error) {
      console.error({ error: true, data: error });
    }
  };
  function storeDoc(data) {
    fs.writeFileSync(docPath, JSON.stringify(data, null, 2));
  }

  function storeSteps({ steps, version }) {
    const oldData = JSON.parse(fs.readFileSync(stepsPath, "utf8"));
    const limitedOldData = oldData.slice(
      Math.max(oldData.length - maxStoredSteps)
    );

    const newData = [
      ...limitedOldData,
      ...steps.map((step, index) => {
        return {
          step: JSON.parse(JSON.stringify(step)),
          version: version + index + 1,
          clientID: step.clientID
        };
      })
    ];

    fs.writeFileSync(stepsPath, JSON.stringify(newData));
  }

  function storeLocked(locked) {
    fs.writeFileSync(lockedPath, locked.toString());
  }

  function getDoc() {
    try {
      return JSON.parse(fs.readFileSync(docPath, "utf8"));
    } catch (e) {
      return defaultData;
    }
  }

  function getLocked() {
    return JSON.parse(fs.readFileSync(lockedPath, "utf8"));
  }

  function getSteps(version) {
    try {
      const steps = JSON.parse(fs.readFileSync(stepsPath, "utf8"));
      return steps.filter(step => step.version > version);
    } catch (e) {
      return [];
    }
  }

  socket.on("getDoc", docId => {
    safeJoin(docId).then(() => {
      io.emit("init", getDoc());
    });
  });
  socket.on("update", function({ version, clientID, steps }) {
    const locked = getLocked();
    // we need to check if there is another update processed
    // so we store a "locked" state

    if (locked) {
      // we will do nothing and wait for another client update
      return;
    }

    storeLocked(true);
    const storedData = getDoc();
    // version mismatch: the stored version is newer
    // so we send all steps of this version back to the user
    if (storedData.version !== version) {
      socket.emit("update", {
        version,
        steps: getSteps(version)
      });
      storeLocked(false);
      return;
    }
    let doc = schema.nodeFromJSON(storedData.doc);

    let newSteps = steps.map(step => {
      const newStep = Step.fromJSON(schema, step);
      newStep.clientID = clientID;

      // apply step to document
      let result = newStep.apply(doc);
      doc = result.doc;

      return newStep;
    });
    // calculating a new version number is easy
    const newVersion = version + newSteps.length;
    // store data
    storeSteps({ version, steps: newSteps });
    storeDoc({ version: newVersion, doc });
    // send update to everyone (me and others)
    io.sockets.emit("update", {
      version: newVersion,
      steps: getSteps(version)
    });

    storeLocked(false);
  });
  socket.on("disconnect", function() {
    io.emit("user disconnected");
  });
});

app.use(compression());

// For development usage only
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front", "dist", "index.html"));
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
        res.send({
          email: user.email,
          id: user.id,
          image: user.image,
          name: user.name,
          role: user.role
        });
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
        res.send({
          email: user.email,
          id: user.id,
          image: user.image,
          name: user.name,
          role: user.role
        });
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
      res.status(403).send({ error: true, data: "You must be logged in" });
    } else {
      res.cookie("jwt", cookie, {
        maxAge: MILLISECONDS_IN_HOUR,
        httpOnly: true
      });
    }
    try {
      return jsonWebToken.verify(cookie, JWTSecretKey);
    } catch (error) {
      res.status(403).send({ error: true, data: error });
      return {};
    }
  }
});
apolloServer.applyMiddleware({
  app,
  cors: { credentials: true, origin: "http://localhost:8080" }
});

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
