import { GraphQLServer } from 'graphql-yoga';
import mongoose from 'mongoose';
import helmet from 'helmet';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';

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
  .once('open', ()=> {
    console.log('MongoDB connection established!')
    // Start the server
    server.start(server_opts, ({ port }) => {
      console.log(`Server is listening on ${port}`)
    })
  })
  .on('error', console.error.bind(console, 'MongoDB connection error!'))
