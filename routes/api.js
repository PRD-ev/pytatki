import express from "express";
import schema, { graphql } from "../schemas/query.js";

var router = express.Router();

// router.get(
//   "/",
//   graphqlHTTP({
//     schema: schema,
//     rootValue: root,
//     graphiql: true
//   })
// );

router.get("/", function(req, res) {
  graphql(schema, req.query.query).then(result => {
    res.json(result);
  });
});

module.exports = router;
