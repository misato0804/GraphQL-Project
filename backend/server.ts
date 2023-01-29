import {ApolloServer} from "apollo-server";
import {typeDefs} from "./src/schema/type-defs";
import {resolvers} from "./src/schema/resolvers";

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(() => {
  console.log("SERVER IS RUNNING")
})