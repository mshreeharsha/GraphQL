import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { resolvers } from "./schema/resolvers.js";
import { typeDefs } from "./schema/schema.js";

//Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

const {url} = await startStandaloneServer(server,{
    listen:{port : 4000}
})
console.log('Server Listining at Port : 4000')