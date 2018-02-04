const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const mongoose = require('./config/mongoose');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const db = mongoose.connect();
const app = express();

app.use('*', cors());

const schema = require('./graphql/index').appSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true
}));

const port = process.env.PORT || config.port  || 4000;
// Up and Running
app.listen(port, () => {
  console.log('A GraphQL API running at port ' +  port);
});