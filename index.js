import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/schema.js";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

//Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

await connectToMongoDB()

const {url} = await startStandaloneServer(server,{
    listen:{port : 4000}
})
console.log('Server Listining at Port : 4000')