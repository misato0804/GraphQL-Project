import {gql} from "apollo-server"

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        friend: [User]
        favouriteMovies: [Movie]
    }
    type Movie {
        id: ID!
        name: String!
        year: Int!
        published: Boolean!
    }
    type Query {
#        Get All User List
        users: [User!]!  
#        Get Single User
        user(id: ID!): User!
#        movies schema
        movies: [Movie!]!
        movie(name: String): Movie!
    }
`