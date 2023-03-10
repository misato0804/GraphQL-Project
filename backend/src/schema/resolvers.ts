import {users, movies} from "../userLink";

export const resolvers = {
    Query: {
        users() {
            if (users) return {users};
            return {message: "something wrong"}
        },
        user(_: any, args: any) {
            const user = users.find(user => user.id === Number(args.id))
            return user;
        },
        movies() {
            return movies;
        },
        movie(_: any, args: any) {
            const movie = movies.find(movie => movie.name === args.name)
            return movie
        },
        userAgeA(_: any, args: any) {
            const user = users.find(user => user.age === Number(args.age))
            return user;
        }
    },

    User: {
        favouriteMovies: () => {
            const movie = movies.filter(movie => movie.published === true)
            return movie
        },

    },
    Mutation: {
        createUser: (_: any, args: any) => {
            const user = args.input
            const lastId = users[users.length - 1].id
            user.id = lastId + 1
            users.push(user)
            return user
        },
        updateUsername: (_: any, args: any) => {
            const id = args.input.id
            const newUsername = args.input.newUsername
            let userUpdated;
            users.forEach(user => {
                if (user.id == id) {
                    user.username = newUsername
                    userUpdated = user
                }
            })
            return userUpdated
        },
        deleteUser: (_: any, args: any) => {
            const id = args.id
            console.log(id)
            const newList = users.filter(user => user.id !== Number(id))
            console.log(newList)
            return newList
        }
    },
    UsersResult: {
        __resolveType(obj: any) {
            if (obj.users) {
                return "UsersSuccessfulResult"
            }
            if (obj.message) {
                return "UsersErrorResult"
            }
            return null;
        }
    }
}