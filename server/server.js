const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require('cors');
const cron = require('./cron');

const app = express();

app.use(cors())

app.use(
  postgraphile(
    "postgres://xxxxxxxxxx:xxxxxxxxxx@localhost:5432/vds_kl",
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

app.listen(4000);

console.log('Hello from the server!');