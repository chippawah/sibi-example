import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';
import helmet from 'helmet';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './database/User';
import { createUsers } from './util'


// Set up the GraphQL Server
const server_opts = {
  port: process.env.GRAPHQL_PAYGROUND_PORT || 3000
}
const server = new GraphQLServer({
  typeDefs: './src/database/schema.graphql',
  resolvers: { Query, Mutation },
  context: (req) => Object.assign({}, req)
});
// Setup the DB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sibi'
mongoose.connect(uri, { useNewUrlParser: true });
mongoose.connection
  .once('open', async ()=> {
    console.log('MongoDB connection established!')
    let users = await User.find().lean();
    if (users.length === 0) {
      users = createUsers();
      await User.collection.insert(users);
    }
    users.forEach((user) => {
      console.log(`You can log in with ${user.email} : ${user.password}`)
    });
    server.start(server_opts, ({ port }) => {
      console.log(`Server is listening on ${port}`)
    });
  })
  .on('error', console.error.bind(console, 'MongoDB connection error!'))
