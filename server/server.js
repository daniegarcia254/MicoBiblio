const express = require('express');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const mongoose = require('./config/mongoose');
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');
const bodyParser = require( 'body-parser');
const User = require('./models/user');
const cors = require('cors');
const db = mongoose.connect();
const app = express();

db.then(function(){
  console.log('Success connecting to database');
}). catch((err) => {
  console.log('Error connecting to database');
})

app.use('*', cors());

const schema = require('./graphql/index').appSchema;
app.use('/graphql',
  cors(),
  bodyParser.json(),
  jwt({
    secret: config.JWT_SECRET,
    credentialsRequired: false
  }),
  graphqlHTTP(req => ({
    schema: schema,
    rootValue: global,
    graphiql: true,
    context: {
      user: req.user ? User.findById(req.user.id) : Promise.resolve(null)
    }
  }))
);

const port = process.env.PORT || config.port  || 4000;
// Up and Running
app.listen(port, () => {
  console.log('A GraphQL API running at port ' +  port);
});