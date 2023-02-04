import {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} from "graphql";
import User from "../models/users";

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: {type : GraphQLID},
        name: {type : GraphQLString},
        username: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find();
            }
        },
        user: {
            type: UserType,
            args: {id : {type: GraphQLID}},
            resolve(parent, args){
                // return users.find(user => user.id === Number(args.id))
                User.findById(args.id);
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                username: {type: GraphQLNonNull(GraphQLString)},
                age: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args) {
                const user = new User({
                    name: args.name,
                    username: args.username,
                    age: args.age
                })
                return user.save();
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
            resolve(parent, arg) {
                return User.findByIdAndDelete(arg.id)
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation
})