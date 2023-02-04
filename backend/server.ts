require("dotenv").config();
import express from "express";
import {graphqlHTTP} from "express-graphql";
import schema from "./src/schema/schema"
import {ApolloServer} from "apollo-server";
import {typeDefs} from "./src/schema/type-defs";
import {resolvers} from "./src/schema/resolvers";
import connectDB from "./src/config/db";

const port = process.env.PORT || 5000;
const app = express();
connectDB()

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development"
}))

const server = new ApolloServer({
    typeDefs,
    resolvers
})

// server.listen().then(({url}) => {
//   console.log("SERVER IS RUNNING"+ url)
// })

app.listen(port, () => {
    console.log(`running port on ${port}`)
})