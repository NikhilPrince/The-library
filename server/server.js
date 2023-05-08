const express = require('express');
const path = require('path');
const { ApolloServer } = require("apollo-server-express");
const { allTypes, fix } = require("./schemas");
const { authenticate } = require("./utils/auth");
const db = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  allTypes,
  fix,
  text: authenticate,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const nameDirect = path.nameDirect("");
const builds = path.join(nameDirect, "../client/build");
app.use(express.static(builds));
// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(_nameDirect, '../client/build')));
}

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
});
